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
} from "@chakra-ui/react";
import Answer from "./_answer&report/answer";
import Report from "./_answer&report/report";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import { CloseForm } from "../_components/CloseForm";

function Post() {
  const postCategories = [
    { category: "Meeting", color: "purple.200" },
    { category: "Election", color: "pink.200" },
    { category: "Inquiry", color: "blue.200" },
    { category: "Event", color: "orange.200" },
    { category: "Other", color: "teal.200" },
  ];

  const [postStatus, setPostStatus] = useState("Closed");

  const datePosted = new Date(2024, 2, 1);
  const dateDistance = formatDistanceToNowStrict(datePosted);

  return (
    <Flex p="10px">
      <Flex
        w="100%"
        h="100%"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mb="1%"
      >
        <Box p="20px">
          <HStack spacing={1}>
            {/* Survey Title */}
            <Heading size="md" fontFamily="font.heading" mb="1%">
              Title
            </Heading>

            {/* Survey Status */}
            <Text
              as="sup"
              fontWeight="bold"
              color={postStatus === "Open" ? "green.500" : "red.500"}
            >
              ({postStatus})
            </Text>
            <Spacer />
          </HStack>

          {/* Survey Categories */}
          <HStack mb="2%">
            {postCategories.map((postCategory, index) => (
              <Box
                key={index}
                bg={postCategory.color}
                fontFamily="font.heading"
                fontSize="xs"
                fontWeight="semibold"
                w="10%"
                p="3px"
                textAlign="center"
                rounded="md"
              >
                {postCategory.category}
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
            ml="6%"
            fontSize="sm"
            p="5px"
            fontFamily="font.body"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            ratione quia! Hic atque nostrum tempore consectetur dolores mollitia
            corporis aliquam labore eligendi, possimus sequi quidem fuga commodi
          </Text>
          {/* Date distance */}
          <Text
            fontFamily="font.body"
            color="grey"
            fontSize="xs"
            ml="6%"
            p="5px"
          >
            Posted {dateDistance} ago
          </Text>
        </Box>
        {/* Survey Button */}
        {postStatus === "Open" ? (
          <Stack p="1rem">
            <CloseForm />
            <Answer />
          </Stack>
        ) : (
          <Report />
        )}
      </Flex>
    </Flex>
  );
}
export default Post;
