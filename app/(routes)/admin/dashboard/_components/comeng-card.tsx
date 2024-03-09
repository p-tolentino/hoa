"use client";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { TbCalendarEvent } from "react-icons/tb";

export default function CommunityEngagmentCard() {
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
            Monthly Events
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            8
          </Text>
        </Box>
        <Avatar
          bg="blue.400"
          size="lg"
          icon={<TbCalendarEvent size={24} color="white" />}
        />
      </Flex>
    </Box>
  );
}
