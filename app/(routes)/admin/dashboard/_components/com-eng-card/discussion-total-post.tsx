"use client";

import { Box, Text, Flex } from "@chakra-ui/react";

interface dashboardPoll {
  discussCount: number;
}

export default function DisccusionCard({ discussCount }: dashboardPoll) {
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
            Total Discussion Posts
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {discussCount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
