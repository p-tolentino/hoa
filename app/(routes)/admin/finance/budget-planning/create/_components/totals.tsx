import { NewBudgetPlanSchema } from "@/server/schemas";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const TotalTable = () => {
  const form = useFormContext<z.infer<typeof NewBudgetPlanSchema>>();
  const [totals, setTotals] = useState({
    totalRev: 0,
    totalExp: 0,
    totalSurplus: 0,
  });

  useEffect(() => {
    const totalRev = form.getValues("cybTotalYearlyRev");
    const totalExp = form.getValues("cybTotalYearlyExp");
    const totalSurplus = totalRev - totalExp;

    setTotals({
      totalRev: totalRev !== null ? totalRev : 0,
      totalExp: totalExp !== null ? totalExp : 0,
      totalSurplus: totalSurplus !== null ? totalSurplus : 0,
    });
    form.setValue("cybTotalYearlySurplus", totalSurplus);
  }, [form]);

  return (
    <Table variant="simple" my="50px" width="65%" align="center">
      <Thead bgColor="brand.300">
        <Tr h="2rem">
          <Th p="1rem"></Th>
          <Th
            p="1rem"
            w="300px"
            fontSize="sm"
            fontFamily="font.heading"
            textAlign="right"
          >
            Current Year Budget (CYB)
          </Th>
          {/* <Th
            p="1rem"
            w="300px"
            fontSize="sm"
            fontFamily="font.heading"
            textAlign="right"
          >
            Current Year Actuals (CYA)
          </Th> */}
        </Tr>
      </Thead>
      <Tbody>
        <Tr fontFamily="font.body">
          <Td p="0.5rem">Total Yearly Revenue</Td>
          <Td p="0.5rem" textAlign="right">
            {totals.totalRev !== null ? `${formatNumber(totals.totalRev)}` : ""}
          </Td>
          {/* <Td p="0.5rem" textAlign="right">
            0
          </Td> */}
        </Tr>
        <Tr fontFamily="font.body">
          <Td p="0.5rem">Total Yearly Expenses</Td>
          <Td p="0.5rem" textAlign="right">
            {totals.totalExp !== null ? `${formatNumber(totals.totalExp)}` : ""}
          </Td>
          {/* <Td p="0.5rem" textAlign="right">
            0
          </Td> */}
        </Tr>
        <Tr fontFamily="font.body">
          <Td p="0.5rem">Total Yearly Operating Overage/Surplus</Td>
          <Td p="0.5rem" textAlign="right">
            {totals.totalSurplus !== null
              ? `${formatNumber(totals.totalSurplus)}`
              : ""}
          </Td>
          {/* <Td p="0.5rem" textAlign="right">
            0
          </Td> */}
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TotalTable;
