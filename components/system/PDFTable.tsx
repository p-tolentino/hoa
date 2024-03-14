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
} from "@chakra-ui/react";

export default function PDFTable() {
  return (
    <>
      <Box p="5%">
        <Stack spacing={3}>
          <Heading fontSize="sm" fontFamily="font.heading">
            Admin Directory Report
          </Heading>
          <Table variant="striped">
            <Thead>
              <Th>Position</Th>
              <Th>Name</Th>
              <Th>Contact Number</Th>
              <Th>Email</Th>
            </Thead>
            <Tbody>
              <Tr fontSize="xs">
                <Td>Superuser</Td>
                <Td>Superuser M. One</Td>
                <Td>99596608231</Td>
                <Td>admin@test.com</Td>
              </Tr>
            </Tbody>
          </Table>
        </Stack>
      </Box>
    </>
  );
}
