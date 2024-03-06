"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Stack, Text, Box, Divider, Progress, Button } from "@chakra-ui/react";

import React, { useEffect, useState } from 'react';
import { getQuestionsAndOptionsByPollId, getOptionResponseCount } from '@/server/data/polls'
import { Polls, User } from '@prisma/client'

interface PollProps {
  poll: Polls;
  user: string;
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

export default function Answer ({poll, user}: PollProps) {

  const [pollDetails, setPollDetails] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

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
            <DialogHeader>
              <DialogTitle>Report</DialogTitle>
              <DialogDescription>View the results.</DialogDescription>
            </DialogHeader>
  
            {/* Form Content */}
            <Stack spacing="15px">
              <Text fontSize="sm" fontWeight="semibold">
                Title:
              </Text>
              <Text fontSize="sm" fontFamily="font.body">
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
                  {pollDetails && pollDetails.map((question, questionIndex) => (
                    <React.Fragment key={question.id}>
                      <Text fontSize="sm" fontWeight="semibold">
                        Question {questionIndex + 1}:
                      </Text>
                      <Text fontSize="sm" fontFamily="font.body">
                        {question.text}
                      </Text>
                      {question.options.map((option, optionIndex) => {
                        // Calculate the total count for the question to use for percentage calculation
                        const totalCountForQuestion = question.options.reduce((acc, curr) => acc + curr.count, 0);
                        const percentage = totalCountForQuestion > 0 ? (option.count / totalCountForQuestion) * 100 : 0;
  
                        return (
                          <Box key={option.id}>
                            <Text fontSize="sm" fontFamily="font.body">
                              Option {optionIndex + 1}: {option.text} - Votes: {option.count}
                            </Text>
                            <Progress colorScheme="yellow" size="sm" value={percentage} /> 
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