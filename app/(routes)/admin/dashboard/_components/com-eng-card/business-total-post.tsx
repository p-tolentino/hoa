"use client";

import { Box, Text, Flex } from "@chakra-ui/react";

interface dashboardPoll {
  businessCount: number;
}

export default function BusinessCard({ businessCount }: dashboardPoll) {
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
            Total Business Posts
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {businessCount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
