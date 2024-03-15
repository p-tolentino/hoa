import {
  Text,
  HStack,
  VStack,
  Stack,
  Box,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";

interface dashboardPoll {
  discussCount: number;
  businessCount: number;
  eventCount: number;
  userPollCount: number;
}

export default function CommunityEngagementCard({
  discussCount,
  businessCount,
  eventCount,
  userPollCount,
}: dashboardPoll) {
  return (
    <Stack>
      <Stack>
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
              <Text
                color="gray.500"
                textTransform="uppercase"
                fontSize="xs"
                align="center"
              >
                Total Posts
              </Text>
              {/* Wrap the numbers in a Flex container with direction set to row */}
              <Flex direction="row" gap="5">
                <Text fontSize="sm" fontWeight="semibold" align="center">
                  {discussCount} Discussion
                </Text>
                <Text fontSize="sm" fontWeight="semibold" align="center">
                  {businessCount} Business
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Stack>
      <Stack>
        <Box>
          <Flex
            alignItems="flex-start"
            direction="row"
            p={4}
            borderRadius="md"
            boxShadow="md"
            bg="white"
          >
            <Box>
              <Text
                color="gray.500"
                textTransform="uppercase"
                fontSize="xs"
                align="center"
              >
                Total Events Posted
              </Text>
              <Text fontSize="sm" fontWeight="bold" align="center">
                {eventCount}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Stack>
      <Stack>
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
              <Text
                color="gray.500"
                textTransform="uppercase"
                fontSize="xs"
                align="center"
              >
                Total Unique Users who answered a Poll
              </Text>
              <Text fontSize="sm" fontWeight="bold" align="center">
                {userPollCount}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Stack>
  );
}
