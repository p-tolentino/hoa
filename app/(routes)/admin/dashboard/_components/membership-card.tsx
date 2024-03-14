"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";

interface dashboardPoll{
  count: number
}

export default function MembershipCard({count}:dashboardPoll) {

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
            {count}
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
