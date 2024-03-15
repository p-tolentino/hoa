"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbReport } from "react-icons/tb";

interface dashboardPoll {
  count: number;
}

export default function DisputeCard({ count }: dashboardPoll) {
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
            Total Dispute Reports (Valid)
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {count}
          </Text>
        </Box>
        <Avatar
          bg="orange.400"
          size="lg"
          icon={<TbReport size={24} color="white" />}
        />
      </Flex>
    </Box>
  );
}
