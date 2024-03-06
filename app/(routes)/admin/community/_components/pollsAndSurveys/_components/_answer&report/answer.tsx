"use client";

import { db } from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  Box,
  Divider,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { Polls, User } from "@prisma/client";
import {
  getQuestionsAndOptionsByPollId,
  hasUserAnsweredPoll,
} from "@/server/data/polls";
import { createResponse } from "@/server/actions/poll";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PollProps {
  poll: Polls;
  user: string;
}

interface Option {
  id: string;
  text: string;
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

export default function Answer({ poll, user }: PollProps) {
  const router = useRouter();
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const [pollDetails, setPollDetails] = useState<Question[] | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [hasAnswered, setHasAnswered] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPollDetails = async () => {
      const response = await getQuestionsAndOptionsByPollId(poll.id);
      console.log("the value queried is", response);

      setPollDetails(response);
    };
    console.log("poll details are now", pollDetails);

    fetchPollDetails();

    const checkAnswerStatus = async () => {
      const answered = await hasUserAnsweredPoll(poll.id);
      setHasAnswered(answered);
    };

    checkAnswerStatus();
  }, [poll.id, user]); // Dependency array ensures this effect runs once per poll ID

  if (!pollDetails) {
    return <div>Loading...</div>; // Handle loading state
  }

  const onSubmit = async () => {
    try {
      const responsePromises = Object.entries(responses).map(
        ([questionId, optionId]) =>
          createResponse(poll.id, questionId, optionId)
      );

      await Promise.all(responsePromises);
      alert("Responses submitted successfully!");
      setIsOpen(false); // Close dialog upon success
      router.refresh(); // Refresh the page or navigate as needed

      // Optionally, reset the responses state or navigate the user to another page
      setResponses({});
    } catch (error) {
      console.error("Failed to submit responses:", error);
      alert("Failed to submit responses.");
    }
  };

  const checkIfAnswered = async () => {
    if (hasAnswered) {
      alert("You have already answered this poll.");
    } else {
      setIsOpen(true); // Open the dialog if the user hasn't answered
    }
  };

  return (
    <>
      <Button
        size="sm"
        fontFamily="font.body"
        variant="outline"
        leftIcon={<EditIcon />}
        onClick={checkIfAnswered}
        disabled={hasAnswered === true} // Disable the button if the user has already answered
      >
        Answer
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              fontFamily="font.body"
              variant="outline"
              leftIcon={<EditIcon />}
              disabled={true} // This button is hidden since the dialog is controlled by the state.
            >
              Answer
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[800px]">
            <DialogHeader>
              <DialogTitle>Answer</DialogTitle>
              <DialogDescription>Enter your answers.</DialogDescription>
            </DialogHeader>

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
                        <RadioGroup
                          size="sm"
                          fontFamily="font.body"
                          onChange={(selectedOption) =>
                            setResponses((prev) => ({
                              ...prev,
                              [question.id]: selectedOption,
                            }))
                          }
                          value={responses[question.id] || ""}
                        >
                          <Stack spacing={2}>
                            {question.options.map((option) => (
                              <Radio key={option.id} value={option.id}>
                                {option.text}
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                      </React.Fragment>
                    ))}
                </Stack>
              </Box>
            </Stack>

            <DialogFooter>
              <Button
                w="full"
                size="sm"
                colorScheme="yellow"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
