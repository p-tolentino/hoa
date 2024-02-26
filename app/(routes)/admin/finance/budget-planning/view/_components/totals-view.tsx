"use client";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

// interface TableRow {
//   id: number
//   total: string
//   currentyearbudget: number
//   currentyearactuals: number
// }

function ViewTotalTable() {
  return (
    <Table variant="simple" my="50px" width="70%" align="center">
      <Thead bgColor="brand.300">
        <Tr h="2rem">
          <Th p="1rem" w="20%"></Th>
          <Th p="1rem" w="300px" fontFamily="font.heading" textAlign="right">
            Current Year Budget (CYB)
          </Th>
          <Th p="1rem" w="300px" fontFamily="font.heading" textAlign="right">
            Year to Date Actuals (YTD-A)
          </Th>
          <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
            Previous Year Budget (PYB)
          </Th>
          <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
            Previous Year Actuals (PYA)
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr fontFamily="font.body" fontSize="md">
          <Td p="0.5rem">Total Yearly Revenue</Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
        </Tr>
        <Tr fontFamily="font.body" fontSize="md">
          <Td p="0.5rem">Total Yearly Expenses</Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
        </Tr>
        <Tr fontFamily="font.body" fontSize="md">
          <Td p="0.5rem">Total Yearly Operating Overage/Surplus</Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
          <Td p="0.5rem" textAlign="right">
            0
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default ViewTotalTable;
