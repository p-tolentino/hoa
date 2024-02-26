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
  expense: string;
  currentyearbudget: number;
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

const ExpenseTable: React.FC = () => {
  // const [data, setData] = useState<TableRow[]>(initialData)
  // const [totals, setTotals] = useState<TableRow>({
  //   id: 0,
  //   expense: 'Total Yearly Expenses',
  //   currentyearbudget: 0
  // })

  // useEffect(() => {
  //   updateTotals()
  // }, [data])

  // const updateTotals = () => {
  //   const total: TableRow = {
  //     id: 0,
  //     expense: 'Total Yearly Expenses',
  //     currentyearbudget: data.reduce(
  //       (sum, row) => sum + parseFloat(row.currentyearbudget.toString()) || 0,
  //       0
  //     )
  //   }
  //   setTotals(total)
  // }

  // const handleExpenseChange = (id: number, newExpense: string) => {
  //   setData(prevData => {
  //     const newData = prevData.map(row =>
  //       row.id === id ? { ...row, expense: newExpense } : row
  //     )
  //     updateTotals()
  //     return newData
  //   })
  // }

  // const handleCurrentYearBudgetChange = (
  //   id: number,
  //   newCurrentYearBudget: number
  // ) => {
  //   setData(prevData =>
  //     prevData.map(row =>
  //       row.id === id
  //         ? { ...row, currentyearbudget: newCurrentYearBudget }
  //         : row
  //     )
  //   )
  // }

  return (
    <VStack mt="1rem">
      <Table variant="simple" size="xs" mt="20px" w="60vw">
        <Thead bgColor="brand.300">
          <Tr h="3rem" fontSize="xs">
            <Th p="1rem" fontFamily="font.heading">
              Expenses
            </Th>
            <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
              Current Year Budget (CYB)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenseItems.map((row) => (
            <Tr fontFamily="font.body" fontSize="sm">
              <Td px="1rem">{row}</Td>
              <Td px="2rem">
                <Input
                  size="sm"
                  textAlign="right"
                  defaultValue={0}
                  // onChange={(value) =>
                  //   handleCurrentYearBudgetChange(row.id, Number(value))
                  // }
                ></Input>
              </Td>
            </Tr>
          ))}
          <Tr h="3rem" key="total" fontFamily="font.body" bg="brand.400">
            <Td px="1rem">Total Yearly Expense</Td>
            <Td px="3rem" textAlign="right" fontSize="md" fontWeight="bold">
              0
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ExpenseTable;
