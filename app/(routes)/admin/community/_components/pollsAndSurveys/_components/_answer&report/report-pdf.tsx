"use client";

import {
  Stack,
  Text,
  Box,
  Divider,
  Progress,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Polls, User, Hoa } from "@prisma/client";
import React from "react";

// Assuming PollDetails includes the `poll` object structure
interface PollProps {
  poll: Polls;
  pollDetail: Question[]; // Assuming questions are part of poll details
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


export default function PDFReport({ poll, pollDetail, hoaInfo }: PollProps) {

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <Box p="5%">
      <Stack spacing={8}>
        <Stack spacing={1}>
          <Heading size="md" fontFamily="font.heading">
            {hoaInfo.name}
          </Heading>
          <Heading fontSize="xs" fontFamily="font.heading">
            Contact Number: {hoaInfo.contactNumber}
          </Heading>
          <Heading fontSize="xs" fontFamily="font.heading">
          Date Generated: {currentDate}
          </Heading>
        </Stack>
        <Stack spacing={1}>
          <Heading size="sm">Polls & Survey Report</Heading>
          <Text fontSize="sm">View the results of the poll or survey.</Text>
        </Stack>
      </Stack>

   {/* Form Content */}
   <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Title: {poll.title}
              </Text>
              <Text fontSize="sm" fontWeight="semibold">
                Description: {poll.description}
              </Text>
              <Divider />

              {/* Poll Result */}
              <Box p="10px" maxH="300px" overflowY="auto">
                <Stack spacing="15px">
                  {pollDetail &&
                    pollDetail.map((question, questionIndex) => (
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
    </Box>
  );
}
