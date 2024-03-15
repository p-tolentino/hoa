"use client";

import { Box, Text, Flex } from "@chakra-ui/react";

interface dashboardPoll {
  userPollCount: number;
}

export default function PollCard({ userPollCount }: dashboardPoll) {
  return (
    <Box>
      <Flex
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        p={4}
        borderRadius="md"
        boxShadow="md"
        bg="white"
      >
        <Box>
          <Text color="gray.500" textTransform="uppercase" fontSize="2xs">
            Total Homeowners (Answered Poll)
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {userPollCount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
