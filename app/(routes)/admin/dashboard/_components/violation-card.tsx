"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbMessageReport } from "react-icons/tb";

export default function ViolationCard() {
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
          <Text color="gray.500" textTransform="uppercase" fontSize="sm">
            Violation Reports
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            6
          </Text>
        </Box>
        <Avatar
          bg="teal.400"
          size="lg"
          icon={<TbMessageReport size={24} color="white" />}
        />
      </Flex>
    </Box>
  );
}
