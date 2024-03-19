import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Heading,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function PDFTable() {
  return (
    <>
      <Box p="5%">
        <Stack spacing={3}>
          <Heading fontSize="md" fontFamily="font.heading">
            Homeowners Association Name
          </Heading>
          <Stack>
            <Heading fontSize="sm" fontFamily="font.heading">
              Homeowners Directory Report
            </Heading>
            <Text fontSize="sm">View the Homeowners Directory.</Text>
          </Stack>
          <Table variant="striped">
            <Thead>
              <Th>Position</Th>
              <Th>Name</Th>
              <Th>Contact Number</Th>
              <Th>House No. & Street</Th>
              <Th>Email Address</Th>
            </Thead>
            <Tbody>
              <Tr fontSize="xs">
                <Td>Member</Td>
                <Td>Juan M. Dela Cruz</Td>
                <Td>99596608231</Td>
                <Td>Sample Address</Td>
                <Td>user1@envsec.com</Td>
              </Tr>

              <Tr fontSize="xs">
                <Td>Member</Td>
                <Td>Mark Garcia</Td>
                <Td>09059099345</Td>
                <Td>Sample Address</Td>
                <Td>user2@envsec.com</Td>
              </Tr>

              <Tr fontSize="xs">
                <Td>Member</Td>
                <Td>James Gonzales</Td>
                <Td>09175660423</Td>
                <Td>Sample Address</Td>
                <Td>user3@envsec.com</Td>
              </Tr>
            </Tbody>
          </Table>
        </Stack>
      </Box>
    </>
  );
}
