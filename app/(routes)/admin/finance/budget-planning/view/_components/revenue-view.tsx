"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  VStack,
} from "@chakra-ui/react";

interface TableRow {
  id: number;
  revenue: string;
  currentyearbudget: number;
  yeartodateactuals: number;
  previousyearbudget: number;
  previousyearactuals: number;
}

// Revenue Items
const revenueItems = [
  "Association Dues",
  "Toll Fees",
  "Facility Rentals",
  "Renovation and Demolition Fees",
  "Car Sticker Receipts",
  "Other Revenue",
];

function ViewRevenueTable() {
  return (
    <VStack mt="1rem">
      <Table variant="simple" size="sm" mt="20px" w="60vw">
        <Thead bgColor="brand.300">
          <Tr h="3rem" fontSize="xs">
            <Th p="1rem" fontFamily="font.heading" w="20%">
              Revenue
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
          {revenueItems.map((row) => (
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
            <Td px="1rem">Total Yearly Revenue</Td>
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

export default ViewRevenueTable;
