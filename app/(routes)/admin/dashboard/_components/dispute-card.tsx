"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbReport } from "react-icons/tb";

export default function DisputeCard() {
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
            Dispute Reports
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            12
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
