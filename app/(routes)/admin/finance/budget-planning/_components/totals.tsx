import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";

interface TableRow {
  id: number;
  total: string;
  currentyearbudget: number;
  currentyearactuals: number;
}

function TotalTable() {
  return (
    <Table variant="simple" size="xs" mt="20px" width="50%" align="right">
      <Thead bgColor="brand.300">
        <Tr>
          <Th width="45%"></Th>
          <Th fontSize="xs" fontFamily="font.heading" textAlign="right">
            Current Year Budget
          </Th>
          <Th fontSize="xs" fontFamily="font.heading" textAlign="right">
            Current Year Actuals
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr fontFamily="font.body">
          <Td textAlign="right">Total Yearly Revenue</Td>
          <Td textAlign="right">10000</Td>
          <Td textAlign="right">20000</Td>
        </Tr>
        <Tr fontFamily="font.body">
          <Td textAlign="right">Total Yearly Expenses</Td>
          <Td textAlign="right">10000</Td>
          <Td textAlign="right">20000</Td>
        </Tr>
        <Tr fontFamily="font.body">
          <Td textAlign="right">Total Yearly Operating Overage/Surplus</Td>
          <Td textAlign="right">10000</Td>
          <Td textAlign="right">20000</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default TotalTable;
