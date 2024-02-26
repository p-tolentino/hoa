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

const RevenueTable: React.FC = () => {
  // const [data, setData] = useState<TableRow[]>(initialData);
  // const [totals, setTotals] = useState<TableRow>({
  //   id: 0,
  //   revenue: 'Total Yearly Revenue',
  //   currentyearbudget: 0
  // })

  // useEffect(() => {
  //   updateTotals();
  // }, [data]);

  // const updateTotals = () => {
  //   const total: TableRow = {
  //     id: 0,
  //     revenue: "Total Yearly Revenue",
  //     currentyearbudget: data.reduce(
  //       (sum, row) => sum + parseFloat(row.currentyearbudget.toString()) || 0,
  //       0
  //     ),
  //   };
  //   setTotals(total);
  // };

  // const handleRevenueChange = (id: number, newRevenue: string) => {
  //   setData((prevData) => {
  //     const newData = prevData.map((row) =>
  //       row.id === id ? { ...row, revenue: newRevenue } : row
  //     );
  //     updateTotals();
  //     return newData;
  //   });
  // };

  // const handleCurrentYearBudgetChange = (
  //   id: number,
  //   newCurrentYearBudget: number
  // ) => {
  //   setData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === id
  //         ? { ...row, currentyearbudget: newCurrentYearBudget }
  //         : row
  //     )
  //   );
  // };

  return (
    <VStack mt="1rem">
      <Table variant="simple" size="xs" mt="20px" w="60vw">
        <Thead bgColor="brand.300">
          <Tr h="3rem">
            <Th p="1rem" fontSize="sm" fontFamily="font.heading">
              Revenue
            </Th>
            <Th p="1rem" fontSize="sm" fontFamily="font.heading" w="300px">
              Current Year Budget (CYB)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {revenueItems.map((row) => (
            <Tr fontFamily="font.body">
              <Td px="1rem">{row}</Td>
              <Td px="2rem">
                <Input
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
            <Td px="1rem">Total Yearly Revenue</Td>
            <Td px="3rem" textAlign="right" fontSize="xl" fontWeight="bold">
              0
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default RevenueTable;
