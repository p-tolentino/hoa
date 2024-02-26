"use client";

import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";

interface TableRow {
  id: number;
  expense: string;
  currentyearbudget: number;
  yeartodateactuals: number;
  previousyearbudget: number;
  previousyearactuals: number;
}

// Expense Items
const expenseItems = [
  "Salaries and Benefits",
  "Utilities",
  "OFfice Supplies",
  "Repair and Maintenance",
  "Donations",
  "Furnitures and Fixtures",
  "Furnitures & Fixtures",
  "Representation Expenses",
  "Legal & Professional Fees",
  "Administrative Costs",
  "Other Expenses",
];

function ViewExpenseTable() {
  return (
    <VStack mt="1rem">
      <Table variant="simple" size="sm" mt="20px" w="60vw">
        <Thead bgColor="brand.300">
          <Tr h="3rem" fontSize="xs">
            <Th p="1rem" fontFamily="font.heading" w="20%">
              Expenses
            </Th>
            <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
              Current Year Budget (CYB)
            </Th>
            <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
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
          {expenseItems.map((row) => (
            <Tr fontFamily="font.body" fontSize="sm">
              <Td px="1rem">{row}</Td>
              <Td px="2rem" textAlign="right">
                0
              </Td>
              <Td px="2rem" textAlign="right">
                0
              </Td>
              <Td px="2rem" textAlign="right">
                0
              </Td>
              <Td px="2rem" textAlign="right">
                0
              </Td>
            </Tr>
          ))}
          <Tr h="3rem" key="total" fontFamily="font.body" bg="brand.400">
            <Td px="1rem">Total Yearly Expense</Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              0
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              0
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              0
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              0
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
}

export default ViewExpenseTable;
