import { Box, Text, Center, Stack, Flex } from "@chakra-ui/react";
import BackButton from "@/components/system/BackButton";

export default function MeetingNotice() {
  const name = "Juan Dela Cruz";
  const description = "Crisostomo Ibarra and Padre Damaso";
  const dateAndTime = "1 March 2024, 3:00PM";
  const location = "HOA Admin Office";

  return (
    <div>
      <Box textAlign="right">
        <BackButton />
      </Box>
      <Center flexDir="column">
        <Text
          my="10px"
          fontSize="xl"
          fontWeight="bold"
          fontFamily="font.heading"
        >
          Dispute Resolution Meeting Notice 📅
        </Text>
        <Box borderWidth="1px" p={10} borderRadius="md" w="50%">
          <Stack spacing={5} fontFamily="font.body" fontSize="lg">
            <Flex justifyContent="space-between">
              <Text>
                Dear <span className="font-bold">{name}</span>,
              </Text>
              <Text>MM/DD/YYYY</Text>
            </Flex>
            <Text textAlign="justify">
              You are hereby summoned to attend a meeting regarding the ongoing
              dispute involving{" "}
              <span className="font-semibold">{description}</span>
              {". "}The meeting is scheduled for{" "}
              <span className="relative rounded bg-yellow-100 px-2 py-1 font-semibold">
                {dateAndTime}
              </span>{" "}
              at the{" "}
              <span className="relative rounded bg-yellow-100 px-2 py-1 font-semibold">
                {location}
                {". "}
              </span>
              Your presence is crucial for resolving this matter.
            </Text>
            <Text textAlign="justify">
              Details of the dispute and proposed resolutions will be discussed.
              Please come prepared to express your perspective and work towards
              a resolution.
            </Text>
            <Text>Thank you for your cooperation.</Text>
            <Text textAlign="justify" mt={5}>
              Sincerely,
            </Text>
            <Box>
              <Text>Maria Clara</Text>
              <Text color="grey">HOA President</Text>
            </Box>
          </Stack>
        </Box>
      </Center>
    </div>
  );
}
