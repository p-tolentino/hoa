import {
  Flex,
  Box,
  Text,
  Stack,
  Heading,
  Avatar,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import AnswerSurvey from "./_answer/survey";

function surveyPosts() {
  return (
    <Flex p="10px">
      <Box
        w="100%"
        h="100%"
        p="20px"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mb="1%"
      >
        <HStack>
          <Heading size="md" fontFamily="font.heading" mb="1%">
            Survey Title
          </Heading>
          <Spacer />
          <AnswerSurvey />
        </HStack>

        {/* Catergories */}
        <HStack mb="2%">
          <Box
            bg="purple.200"
            fontFamily="font.heading"
            fontSize="xs"
            fontWeight="semibold"
            w="10%"
            p="3px"
            textAlign="center"
            rounded="md"
          >
            Meeting
          </Box>
          <Box
            bg="red.200"
            fontFamily="font.heading"
            fontSize="xs"
            fontWeight="semibold"
            w="10%"
            p="3px"
            textAlign="center"
            rounded="md"
          >
            Election
          </Box>
          <Box
            bg="blue.200"
            fontFamily="font.heading"
            fontSize="xs"
            fontWeight="semibold"
            w="10%"
            p="3px"
            textAlign="center"
            rounded="md"
          >
            Inquiry
          </Box>
          <Box
            bg="orange.200"
            fontFamily="font.heading"
            fontSize="xs"
            fontWeight="semibold"
            w="10%"
            p="3px"
            textAlign="center"
            rounded="md"
          >
            Event
          </Box>
          <Box
            bg="pink.200"
            fontFamily="font.heading"
            fontSize="xs"
            fontWeight="semibold"
            w="10%"
            p="3px"
            textAlign="center"
            rounded="md"
          >
            New Category
          </Box>
        </HStack>

        {/* Survey Details */}
        <HStack p="5px">
          <Avatar /> {/*default size is medium*/}
          <Stack spacing="0.5px">
            <Text
              id="name"
              fontSize="sm"
              fontWeight="bold"
              fontFamily="font.body"
            >
              Name
            </Text>
            <Text
              id="position"
              fontSize="sm"
              fontWeight="bold"
              fontFamily="font.body"
            >
              Position (Homeowner or Officer)
            </Text>
          </Stack>
        </HStack>
        <Text
          id="description"
          ml="5.5%"
          fontSize="sm"
          p="5px"
          fontFamily="font.body"
        >
          Description of Survey Description of Survey Description of Survey
          Description of Survey Description of Survey Description of Survey
          Description of Survey Description of Survey Description of Survey
        </Text>
      </Box>
    </Flex>
  );
}
export default surveyPosts;
