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
  Button,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TableRow {
  id: number;
  revenue: string;
  currentyearbudget: number;
}

const initialData: TableRow[] = [
  {
    id: 1,
    revenue: "Association Dues",
    currentyearbudget: 25,
  },
  {
    id: 2,
    revenue: "Other Revenue",
    currentyearbudget: 25,
  },
];

// Select Revenue Items
const selectRevenue = [
  { value: "associationDues", text: "Association Dues" },
  { value: "tollFees", text: "Toll Fees" },
  { value: "facilityRentals", text: "Facility Rentals" },
  {
    value: "renovationAndDemolitionFees",
    text: "Renovation and Demolition Fees",
  },
  { value: "carStickerReceipts", text: "Car Sticker Receipts" },
  { value: "otherRevenue", text: "Other Revenue" },
];

const RevenueTable: React.FC = () => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [totals, setTotals] = useState<TableRow>({
    id: 0,
    revenue: "Total Yearly Revenue",
    currentyearbudget: 0,
  });

  useEffect(() => {
    updateTotals();
  }, [data]);

  const updateTotals = () => {
    const total: TableRow = {
      id: 0,
      revenue: "Total Yearly Revenue",
      currentyearbudget: data.reduce(
        (sum, row) => sum + parseFloat(row.currentyearbudget.toString()) || 0,
        0
      ),
    };
    setTotals(total);
  };

  const handleRevenueChange = (id: number, newRevenue: string) => {
    setData((prevData) => {
      const newData = prevData.map((row) =>
        row.id === id ? { ...row, revenue: newRevenue } : row
      );
      updateTotals();
      return newData;
    });
  };

  const handleCurrentYearBudgetChange = (
    id: number,
    newCurrentYearBudget: number
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, currentyearbudget: newCurrentYearBudget }
          : row
      )
    );
  };

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: data.length + 1,
      revenue: "",
      currentyearbudget: 0,
    };
    setData((prevData) => [...prevData, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  return (
    <VStack>
      <Table variant="simple" size="xs" mt="20px" w="60vw">
        <Thead bgColor="brand.300">
          <Tr h="3rem">
            <Th p="1rem" fontSize="sm" fontFamily="font.heading">
              Revenue
            </Th>
            <Th p="1rem" fontSize="sm" fontFamily="font.heading" w="250px">
              Current Year Budget
            </Th>
            <Th p="1rem" fontSize="xs" w="100px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id} fontFamily="font.body">
              <Td>
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={row.revenue}
                      onChange={(value) =>
                        handleRevenueChange(row.id, String(value))
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {selectRevenue.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Td>

              <Td>
                <Input
                  textAlign="right"
                  defaultValue={row.currentyearbudget}
                  onChange={(value) =>
                    handleCurrentYearBudgetChange(row.id, Number(value))
                  }
                ></Input>
              </Td>

              <Td textAlign="center">
                <Button
                  onClick={() => handleDeleteRow(row.id)}
                  colorScheme="red"
                  size="sm"
                  ml="1rem"
                >
                  <DeleteIcon boxSize={3} />
                </Button>
              </Td>
            </Tr>
          ))}
          <Tr h="3rem" key="total" fontFamily="font.body" bg="brand.400">
            <Td pl="1rem">Total Yearly Revenue</Td>
            <Td pr="1rem" textAlign="right">
              {totals.currentyearbudget}
            </Td>
            <Td />
          </Tr>
        </Tbody>
      </Table>
      <Button
        onClick={handleAddRow}
        size="sm"
        marginTop="4"
        fontFamily="font.body"
      >
        <AddIcon boxSize={3} mr="5px" /> Add Row
      </Button>
    </VStack>
  );
};

export default RevenueTable;
