"use client";

import { Box, Text, HStack } from "@chakra-ui/react";

export default function Penalty() {
  return (
    <Box>
      <HStack>
        <Text fontSize="md" fontWeight="semibold">
          (Insert Violation Name) Penalty
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          ₱ 500
        </Text>
      </HStack>
    </Box>
  );
}
