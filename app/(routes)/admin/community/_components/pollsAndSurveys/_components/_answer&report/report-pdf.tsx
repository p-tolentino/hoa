"use client";

import {
  Stack,
  Text,
  Box,
  Divider,
  Progress,
  Heading,
  HStack,
} from "@chakra-ui/react";

export default function PDFReport() {
  return (
    <Box p="5%">
      <Stack spacing={3}>
        <Heading size="md">Homeowners Association Name</Heading>
        <Stack>
          <Heading size="sm">Polls & Survey Report</Heading>
          <Text fontSize="sm">View the results of the poll or survey.</Text>
        </Stack>
      </Stack>

      {/* Form Content */}
      <Stack mt="3%">
        <HStack>
          <Text fontSize="md" fontWeight="semibold">
            Title:
          </Text>
          <Text fontSize="md" fontFamily="font.body">
            title here
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="md" fontWeight="semibold">
            Description:
          </Text>
          <Text fontSize="md" fontFamily="font.body">
            description here
          </Text>
        </HStack>
        <Divider />

        {/* Poll Result */}
        <Box p="10px" maxH="300px" overflowY="auto">
          <Stack spacing="15px">
            <Text fontSize="sm" fontWeight="semibold">
              Question 1:
            </Text>
            <Text fontSize="sm" fontFamily="font.body">
              What lunch meal do you prefer for the Easter Egg Hunt event?
            </Text>
            <Box>
              <Text fontSize="sm" fontFamily="font.body">
                Option 1: Mcdonalds - Votes: 1
              </Text>
              <Progress mb="2%" colorScheme="yellow" size="sm" value={100} />
              <Text fontSize="sm" fontFamily="font.body">
                Option 2: Jollibee - Votes: 0
              </Text>
              <Progress mb="2%" colorScheme="yellow" size="sm" value={0} />
              <Text fontSize="sm" fontFamily="font.body">
                Option 3: KFC - Votes: 0
              </Text>
              <Progress mb="2%" colorScheme="yellow" size="sm" value={0} />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
