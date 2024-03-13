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
import { getPersonalInfo } from "@/server/data/user-info";
import { updateStatus } from "@/server/actions/poll";

import { Polls, User } from "@prisma/client";

import React, { useEffect } from "react";

interface PollProps {
  polls: Polls[];
  user: string;
  userInfos: UserInfos;
}

interface UserInfo {
  lastName: string | null;
  firstName: string | null;
  position: string | null;
}

interface UserInfos {
  [userId: string]: UserInfo | null;
}

const Post: React.FC<PollProps> = ({ polls, user, userInfos }) => {
  const categoryColors = {
    MEETING: "purple.200",
    ELECTION: "pink.200",
    INQUIRY: "blue.200",
    EVENT: "orange.200",
    FOODANDDRINK: "purple.200",
    CLOTHING: "pink.200",
    HOUSEHOLDITEMS: "blue.200",
    HOMESERVICES: "orange.200",
    OTHER: "teal.200",
  };

  const [usersInfo, setUsersInfo] = useState<UserInfos>({});
  const [postStatus, setPostStatus] = useState("Open");

  useEffect(() => {
    polls.forEach(async (poll) => {
      const startDate = new Date(poll.startDate);
      const endDate = new Date(poll.endDate);
      const now = new Date();

      let newStatus: "ACTIVE" | "INACTIVE" = "INACTIVE";
      if (now >= startDate && now <= endDate) {
        newStatus = "ACTIVE";
      }

      if (poll.status !== newStatus) {
        await updateStatus(poll.id, newStatus);
        // Optionally: Set state here to re-render the component or refetch the polls to reflect the update.
        // This will depend on how you manage state in your component.
      }
    });
  }, [polls]);

  // useEffect(() => {
  //   const fetchUserInfos = async () => {
  //     // Extract unique userIds from polls to avoid redundant fetches
  //     const uniqueUserIds = Array.from(
  //       new Set(polls.map((poll) => poll.userId))
  //     );

  //     // Fetch user info for each unique userId
  //     const userInfoPromises = uniqueUserIds.map(async (userId) => {
  //       const userInfo = await getPersonalInfo(userId);
  //       return { userId, userInfo };
  //     });

  //     // Resolve all promises and update state
  //     const userInfosArray = await Promise.all(userInfoPromises);
  //     const userInfosObj = userInfosArray.reduce<UserInfos>(
  //       (acc, { userId, userInfo }) => {
  //         acc[userId] = userInfo;
  //         return acc;
  //       },
  //       {}
  //     );

  //     setUsersInfo(userInfosObj);
  //   };

  //   fetchUserInfos();
  // }, [polls]);

  return (
    <>
      {polls.map((poll) => (
        <Flex p="10px" key={poll.id}>
          <Box
            w="100%"
            h="100%"
            border="1px"
            borderColor="gray.200"
            borderRadius="10px"
            mb="1%"
          >
            {/* Survey Status */}
            <Box
              fontSize="xs"
              w="20%"
              textAlign="center"
              ml="20px"
              fontWeight="bold"
              bgColor={poll.status == "ACTIVE" ? "green.200" : "red.200"}
            >
              {/* {poll.status} */}
              {poll.status === "ACTIVE"
                ? "Active"
                : new Date() < new Date(poll.startDate)
                ? "Inactive - Incoming Poll"
                : new Date() > new Date(poll.endDate)
                ? "Inactive - Voting Period is Over"
                : "Inactive"}
            </Box>
            <Box p="20px">
              <HStack mb="0.5rem">
                <Stack spacing={0}>
                  {/* Survey Title */}
                  <Heading size="md" fontFamily="font.heading" mb="1%">
                    {poll.title}
                  </Heading>
                  {/* Survey Duration */}
                  <Text fontSize="xs">
                    Duration:{" "}
                    {poll.startDate
                      ? poll.startDate.toLocaleString()
                      : "Start date not set"}{" "}
                    to{" "}
                    {poll.endDate
                      ? poll.endDate.toLocaleString()
                      : "End date not set"}
                  </Text>
                </Stack>
                <Spacer />
                {/* Survey Button */}
                {poll.status == "ACTIVE" ? (
                  <HStack>
                    <Answer poll={poll} user={user} />
                  </HStack>
                ) : (
                  <Report poll={poll} user={user} />
                )}
              </HStack>

              {/* Survey Categories */}
              <HStack mb="2%">
                <Box
                  bg={categoryColors[poll.category]}
                  fontFamily="font.heading"
                  fontSize="xs"
                  fontWeight="semibold"
                  w="wrap"
                  p="3px"
                  pr="8px"
                  pl="8px"
                  textAlign="center"
                  rounded="md"
                >
                  {poll.category}
                </Box>
              </HStack>

              {/* Survey Details */}
              <Flex gap="0.5rem">
                <Avatar /> {/*default size is medium*/}
                <Box>
                  <Text
                    id="name"
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="font.body"
                  >
                    {userInfos[poll.userId]?.firstName ||
                      "Fullname is still loading"}
                    {userInfos[poll.userId]?.lastName}
                  </Text>
                  <Text
                    id="position"
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="font.body"
                  >
                    {userInfos[poll.userId]?.position ||
                      "Position is stil loading"}
                  </Text>
                  <Text
                    id="description"
                    fontSize="sm"
                    py="10px"
                    fontFamily="font.body"
                  >
                    {poll.description}
                  </Text>
                  {/* Date distance */}
                  <Text fontFamily="font.body" color="grey" fontSize="xs">
                    Posted {formatDistanceToNowStrict(new Date(poll.createdAt))}{" "}
                    ago
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      ))}
    </>
  );
};
export default Post;
