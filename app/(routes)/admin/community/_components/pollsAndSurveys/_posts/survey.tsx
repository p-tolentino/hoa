"use client";

import {
  Flex,
  Box,
  Text,
  Stack,
  Heading,
  Avatar,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import AnswerSurvey from "./_answer/survey";
import SurveyResult from "./_result/survey";
import { formatDistanceToNowStrict } from "date-fns";

function surveyPosts() {
  const pollCategories = [
    { category: "Meeting", color: "purple.200" },
    { category: "Election", color: "pink.200" },
    { category: "Inquiry", color: "blue.200" },
    { category: "Event", color: "orange.200" },
    { category: "New Category", color: "teal.200" },
  ];

  const datePosted = new Date(2024, 2, 1);
  const dateDistance = formatDistanceToNowStrict(datePosted);

  return (
    <Flex p="10px">
      <Box
        w="100%"
        h="100%"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mb="1%"
      >
        <Box
          bgColor="green.200"
          fontSize="xs"
          fontWeight="bold"
          w="5%"
          textAlign="center"
          ml="20px"
        >
          Open
        </Box>
        {/* <Box
          bgColor="red.200"
          fontSize="xs"
          fontWeight="semibold"
          w="6%"
          textAlign="center"
          ml="20px"
        >
          Closed
        </Box> */}

        <Box p="20px">
          <HStack>
            <Heading size="md" fontFamily="font.heading" mb="1%">
              Survey Title
            </Heading>
            <Spacer />
            {/* <AnswerSurvey /> */}
            <SurveyResult />
          </HStack>

          {/* Survey Catergories */}
          <HStack mb="2%">
            {pollCategories.map((pollCategory, index) => (
              <Box
                key={index}
                bg={pollCategory.color}
                fontFamily="font.heading"
                fontSize="xs"
                fontWeight="semibold"
                w="10%"
                p="3px"
                textAlign="center"
                rounded="md"
              >
                {pollCategory.category}
              </Box>
            ))}
          </HStack>

          {/* Survey Details */}
          <HStack p="5px">
            <Avatar /> {/*default size is medium*/}
            <Stack spacing="0.5px">
              <Text
                id="name"
                fontSize="sm"
                fontWeight="bold"
                fontFamily="font.body"
              >
                Name
              </Text>
              <Text
                id="position"
                fontSize="sm"
                fontWeight="bold"
                fontFamily="font.body"
              >
                Position (Homeowner or Officer)
              </Text>
            </Stack>
          </HStack>
          <Text
            id="description"
            ml="5.5%"
            fontSize="sm"
            p="5px"
            fontFamily="font.body"
          >
            Description of Survey Description of Survey Description of Survey
            Description of Survey Description of Survey Description of Survey
            Description of Survey Description of Survey Description of Survey
          </Text>
          {/* Date distance */}
          <Text
            fontFamily="font.body"
            color="grey"
            fontSize="xs"
            ml="5.5%"
            p="5px"
          >
            Posted {dateDistance} ago
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
export default surveyPosts;