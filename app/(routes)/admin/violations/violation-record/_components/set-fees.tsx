"use client";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Switch,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Fee {
  name: string;
  cost: number;
  switchedOn: boolean;
}

export default function SetFees() {
  const initialFees: Fee[] = [
    {
      name: "Mediation or Arbitration Fees",
      cost: 500,
      switchedOn: false,
    },
    {
      name: "Administrative Fees",
      cost: 200,
      switchedOn: false,
    },
    {
      name: "Legal Fees",
      cost: 800,
      switchedOn: false,
    },
    {
      name: "Violation Fees",
      cost: 600,
      switchedOn: false,
    },
  ];

  const [fees, setFees] = useState<Fee[]>(initialFees);
  const [total, setTotal] = useState(0);

  const handleSwitchChange = (index: number) => {
    const updatedFees = [...fees];
    updatedFees[index].switchedOn = !updatedFees[index].switchedOn;
    calculateTotal(updatedFees);
  };

  const calculateTotal = (feesArray: Fee[]) => {
    const selectedFees = feesArray.filter((fee) => fee.switchedOn);
    const totalAmount = selectedFees.reduce((sum, fee) => sum + fee.cost, 0);
    setTotal(totalAmount);
  };

  return (
    <TableContainer>
      <Table size="sm">
        <TableCaption fontFamily="font.body">
          Choose the specific HOA services rendered during the dispute
          resolution process.
        </TableCaption>
        <Thead>
          <Th>HOA Services</Th>
          <Th textAlign="right">Amount</Th>
          <Th />
        </Thead>
        <Tbody>
          {fees.map((fee, index) => (
            <Tr fontFamily="font.body">
              <Td>{fee.name}</Td>
              <Td isNumeric>{`₱ ${fee.cost}`}</Td>
              <Td>
                <Flex justifyContent="flex-end">
                  <Switch
                    colorScheme="yellow"
                    isChecked={fee.switchedOn}
                    onChange={() => handleSwitchChange(index)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th fontSize="sm">Total</Th>
            <Th fontSize="sm" isNumeric>
              ₱ {total}
            </Th>
            <Th />
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
