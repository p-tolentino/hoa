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
  expense: string;
  currentyearbudget: number;
}

const initialData: TableRow[] = [
  {
    id: 1,
    expense: "Salaries and Benefits",
    currentyearbudget: 25,
  },
  {
    id: 2,
    expense: "Office Supplies",
    currentyearbudget: 25,
  },
  {
    id: 3,
    expense: "Other Expenses",
    currentyearbudget: 25,
  },
];

// Select Expense Items
const selectExpense = [
  { value: "salaries", text: "Salaries and Benefits" },
  { value: "utilities", text: "Utilities" },
  { value: "supplies", text: "Office Supplies" },
  {
    value: "maintenance",
    text: "Repairs & Maintenance",
  },
  { value: "donations", text: "Donations" },
  { value: "furnitures", text: "Furnitures & Fixtures" },
  { value: "representation", text: "Representation Expenses" },
  { value: "legal", text: "Legal & Professional Fees" },
  { value: "administrative", text: "Administrative Costs" },
  { value: "furnitures", text: "Furnitures & Fixtures" },
  { value: "otherExpenses", text: "Other Expenses" },
];

const ExpenseTable: React.FC = () => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [totals, setTotals] = useState<TableRow>({
    id: 0,
    expense: "Total Yearly Expenses",
    currentyearbudget: 0,
  });

  useEffect(() => {
    updateTotals();
  }, [data]);

  const updateTotals = () => {
    const total: TableRow = {
      id: 0,
      expense: "Total Yearly Expenses",
      currentyearbudget: data.reduce(
        (sum, row) => sum + parseFloat(row.currentyearbudget.toString()) || 0,
        0
      ),
    };
    setTotals(total);
  };

  const handleExpenseChange = (id: number, newExpense: string) => {
    setData((prevData) => {
      const newData = prevData.map((row) =>
        row.id === id ? { ...row, expense: newExpense } : row
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
      expense: "",
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
              Expenses
            </Th>
            <Th p="1rem" fontSize="sm" fontFamily="font.heading" w="250px">
              Current Year Budget
            </Th>
            <Th p="1rem" fontSize="sm" w="100px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id} fontFamily="font.body">
              <Td>
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={row.expense}
                      onChange={(value) =>
                        handleExpenseChange(row.id, String(value))
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {selectExpense.map((item) => (
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
            <Td pl="1rem">Total Yearly Expenses</Td>
            <Td textAlign="right" pr="1rem">
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

export default ExpenseTable;
