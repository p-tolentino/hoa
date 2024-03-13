import { Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";

export default function PDFTable() {
  return (
    <Table>
      <Thead>
        <Th>Position</Th>
        <Th>Name</Th>
        <Th>Contact Number</Th>
        <Th>Email</Th>
      </Thead>
      <Tbody>
        <Tr>
          <Td>asd</Td>
          <Td>asd</Td>
          <Td>asd</Td>
          <Td>asd</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
