"use client";

import { Box, Text, Flex } from "@chakra-ui/react";

interface dashboardPoll {
  eventCount: number;
}

export default function EventCard({ eventCount }: dashboardPoll) {
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
          <Text color="gray.500" textTransform="uppercase" fontSize="xs">
            Total Events Posted
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {eventCount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
