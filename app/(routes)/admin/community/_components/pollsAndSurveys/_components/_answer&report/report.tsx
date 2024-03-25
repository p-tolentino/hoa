"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Stack,
  Text,
  Box,
  Divider,
  Progress,
  Button,
  Flex,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import {
  getQuestionsAndOptionsByPollId,
  getOptionResponseCount,
} from "@/server/data/polls";
import { Polls, User, Hoa } from "@prisma/client";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFReport from "./report-pdf";

interface PollProps {
  poll: Polls;
  user: string;
  hoaInfo: Hoa;
}

interface Option {
  id: string;
  text: string;
  count: number;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface PollDetails {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function Report({ poll, user, hoaInfo }: PollProps) {
  const [pollDetails, setPollDetails] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Polls & Surveys Report",
    //onAfterPrint: () => alert("Data saved in PDF"),
  });

  useEffect(() => {
    const fetchPollDetailsAndCounts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await getQuestionsAndOptionsByPollId(poll.id);
        if (response) {
          const questionsWithCounts = await Promise.all(
            response.map(async (question) => {
              const optionsWithCounts = await Promise.all(
                question.options.map(async (option) => {
                  const count = await getOptionResponseCount(option.id);
                  return { ...option, count }; // Append the count to each option
                })
              );
              return { ...question, options: optionsWithCounts }; // Replace options with options that include counts
            })
          );
          setPollDetails(questionsWithCounts);
        }
      } catch (error) {
        console.error("Failed to fetch poll details and counts:", error);
        // Handle error state if necessary
      }
      setIsLoading(false); // End loading
    };

    fetchPollDetailsAndCounts();
  }, [poll.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" fontFamily="font.body" colorScheme="green">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <div className="hidden">
              <div ref={componentPDF} style={{ width: "100%" }}>
                {pollDetails &&
                <PDFReport 
                poll={poll}
                pollDetail={pollDetails}
                hoaInfo={hoaInfo}/>
                }
              </div>
            </div>
            <DialogHeader>
              <Flex justifyContent="space-between">
                <Stack direction="column" alignItems="flex-start">
                  <DialogTitle>Report</DialogTitle>
                  <DialogDescription>View the results.</DialogDescription>
                </Stack>
                <Button
                  mr="5%"
                  size="xs"
                  colorScheme="yellow"
                  onClick={generatePDF}
                >
                  Generate PDF
                </Button>
              </Flex>
            </DialogHeader>

            {/* Form Content */}
            <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Title:
              </Text>
              <Text fontSize="md" fontWeight="semibold" fontFamily="font.body">
                {poll.title}
              </Text>
              <Text fontSize="sm" fontWeight="semibold">
                Description:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
                {poll.description}
              </Text>
              <Divider />

              {/* Poll Result */}
              <Box p="10px" maxH="300px" overflowY="auto">
                <Stack spacing="15px">
                  {pollDetails &&
                    pollDetails.map((question, questionIndex) => (
                      <React.Fragment key={question.id}>
                        <Text fontSize="sm" fontWeight="semibold">
                          Question {questionIndex + 1}:
                        </Text>
                        <Text fontSize="sm" fontFamily="font.body">
                          {question.text}
                        </Text>
                        {question.options.map((option, optionIndex) => {
                          // Calculate the total count for the question to use for percentage calculation
                          const totalCountForQuestion = question.options.reduce(
                            (acc, curr) => acc + curr.count,
                            0
                          );
                          const percentage =
                            totalCountForQuestion > 0
                              ? (option.count / totalCountForQuestion) * 100
                              : 0;

                          return (
                            <Box key={option.id}>
                              <Text fontSize="sm" fontFamily="font.body">
                                Option {optionIndex + 1}: {option.text} - Votes:{" "}
                                {option.count}
                              </Text>
                              <Progress
                                colorScheme="yellow"
                                size="sm"
                                value={percentage}
                              />
                            </Box>
                          );
                        })}
                      </React.Fragment>
                    ))}
                </Stack>
              </Box>
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
