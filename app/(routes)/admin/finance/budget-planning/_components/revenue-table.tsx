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

interface TableRow {
  id: number;
  revenue: string;
  currentyearbudget: number;
  yeartodateactuals: number;
  previousyearbudget: number;
  previousyearactuals: number;
}

const initialData: TableRow[] = [
  {
    id: 1,
    revenue: "Fundraising",
    currentyearbudget: 25,
    yeartodateactuals: 10,
    previousyearbudget: 50,
    previousyearactuals: 60,
  },
  {
    id: 2,
    revenue: "Association Dues",
    currentyearbudget: 25,
    yeartodateactuals: 10,
    previousyearbudget: 50,
    previousyearactuals: 60,
  },
  {
    id: 3,
    revenue: "Foundations",
    currentyearbudget: 25,
    yeartodateactuals: 10,
    previousyearbudget: 50,
    previousyearactuals: 60,
  },
];

const RevenueTable: React.FC = () => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [totals, setTotals] = useState<TableRow>({
    id: 0,
    revenue: "Total Yearly Revenue",
    currentyearbudget: 0,
    yeartodateactuals: 0,
    previousyearbudget: 0,
    previousyearactuals: 0,
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
      yeartodateactuals: data.reduce(
        (sum, row) => sum + parseFloat(row.yeartodateactuals.toString()) || 0,
        0
      ),
      previousyearbudget: data.reduce(
        (sum, row) => sum + parseFloat(row.previousyearbudget.toString()) || 0,
        0
      ),
      previousyearactuals: data.reduce(
        (sum, row) => sum + parseFloat(row.previousyearactuals.toString()) || 0,
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

  const handleYearToDateActualsChange = (
    id: number,
    newYearToDateActuals: number
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, yeartodateactuals: newYearToDateActuals }
          : row
      )
    );
  };

  const handlePreviousYearBudgetChange = (
    id: number,
    newPreviousYearBudget: number
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, previousyearbudget: newPreviousYearBudget }
          : row
      )
    );
  };

  const handlePreviousYearActualsChange = (
    id: number,
    newPreviousYearActuals: number
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, previousyearactuals: newPreviousYearActuals }
          : row
      )
    );
  };

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: data.length + 1,
      revenue: "",
      currentyearbudget: 0,
      yeartodateactuals: 0,
      previousyearbudget: 0,
      previousyearactuals: 0,
    };
    setData((prevData) => [...prevData, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  return (
    <VStack>
      <Table variant="simple" size="xs" mt="20px">
        <Thead bgColor="brand.300">
          <Tr>
            <Th fontSize="sm" fontFamily="font.heading" width="50%">
              Revenue
            </Th>
            <Th fontSize="xs" fontFamily="font.heading">
              Current Year Budget
            </Th>
            <Th fontSize="xs" fontFamily="font.heading">
              Year to Date Actuals
            </Th>
            <Th fontSize="xs" fontFamily="font.heading">
              Previous Year Budget
            </Th>
            <Th fontSize="xs" fontFamily="font.heading">
              Previous Year Actuals
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id} fontFamily="font.body">
              <Td>
                <Input
                  defaultValue={row.revenue}
                  onChange={(value) =>
                    handleRevenueChange(row.id, String(value))
                  }
                ></Input>
              </Td>
              <Td>
                <Input
                  defaultValue={row.currentyearbudget}
                  onChange={(value) =>
                    handleCurrentYearBudgetChange(row.id, Number(value))
                  }
                ></Input>
              </Td>
              <Td>
                <Input
                  defaultValue={row.yeartodateactuals}
                  onChange={(value) =>
                    handleYearToDateActualsChange(row.id, Number(value))
                  }
                ></Input>
              </Td>
              <Td>
                <Input
                  defaultValue={row.previousyearbudget}
                  onChange={(value) =>
                    handlePreviousYearBudgetChange(row.id, Number(value))
                  }
                ></Input>
              </Td>
              <Td>
                <Input
                  defaultValue={row.previousyearactuals}
                  onChange={(value) =>
                    handlePreviousYearActualsChange(row.id, Number(value))
                  }
                ></Input>
              </Td>
              <Td>
                <Button
                  onClick={() => handleDeleteRow(row.id)}
                  colorScheme="red"
                  size="sm"
                >
                  <DeleteIcon boxSize={3} />
                </Button>
              </Td>
            </Tr>
          ))}
          <Tr key="total" fontFamily="font.body" bg="brand.400">
            <Td>Total Yearly Revenue</Td>
            <Td>{totals.currentyearbudget}</Td>
            <Td>{totals.yeartodateactuals}</Td>
            <Td>{totals.previousyearbudget}</Td>
            <Td>{totals.previousyearactuals}</Td>
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
