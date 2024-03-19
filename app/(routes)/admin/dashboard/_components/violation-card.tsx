"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbMessageReport } from "react-icons/tb";

interface dashboardPoll {
  count: number;
}

export default function ViolationCard({ count }: dashboardPoll) {
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
            Total (Valid) Violation Reports
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {count}
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
