"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";

export default function MembershipCard() {
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
            Total Homeowners
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            220
          </Text>
        </Box>
        <Avatar
          bg="purple.400"
          size="lg"
          icon={<FaUserFriends size={24} color="white" />}
        />
      </Flex>
    </Box>
  );
}
