import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { BudgetPlan } from "@prisma/client";

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ViewTotalTable = ({
  plan,
  previous,
}: {
  plan: BudgetPlan | null;
  previous: BudgetPlan | null;
}) => {
  return (
    <Table variant="simple" my="50px" width="70%" align="center">
      <Thead bgColor="brand.300">
        <Tr h="2rem">
          <Th p="1rem" w="20%"></Th>
          <Th p="1rem" w="300px" fontFamily="font.heading" textAlign="right">
            Current Year Budget (CYB)
          </Th>
          <Th p="1rem" w="300px" fontFamily="font.heading" textAlign="right">
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
        <Tr fontFamily="font.body" fontSize="md">
          <Td p="0.5rem">Total Yearly Revenue</Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.cybTotalYearlyRev
              ? `${formatNumber(plan?.cybTotalYearlyRev)}`
              : 0}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.ytdaTotalYearlyRev
              ? `${formatNumber(plan?.ytdaTotalYearlyRev)}`
              : 0}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.pybTotalYearlyRev
              ? `${formatNumber(plan?.pybTotalYearlyRev)}`
              : previous?.cybTotalYearlyRev
              ? `${formatNumber(previous?.cybTotalYearlyRev)}`
              : "No record"}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.pyaTotalYearlyRev
              ? `${formatNumber(plan?.pyaTotalYearlyRev)}`
              : previous?.ytdaTotalYearlyRev
              ? `${formatNumber(previous?.ytdaTotalYearlyRev)}`
              : "No record"}
          </Td>
        </Tr>
        <Tr fontFamily="font.body" fontSize="md">
          <Td p="0.5rem">Total Yearly Expenses</Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.cybTotalYearlyExp
              ? `${formatNumber(plan?.cybTotalYearlyExp)}`
              : 0}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.ytdaTotalYearlyExp
              ? `${formatNumber(plan?.ytdaTotalYearlyExp)}`
              : 0}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.pybTotalYearlyExp
              ? `${formatNumber(plan?.pybTotalYearlyExp)}`
              : previous?.cybTotalYearlyExp
              ? `${formatNumber(previous?.cybTotalYearlyExp)}`
              : "No record"}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.pyaTotalYearlyExp
              ? `${formatNumber(plan?.pyaTotalYearlyExp)}`
              : previous?.ytdaTotalYearlyExp
              ? `${formatNumber(previous?.ytdaTotalYearlyExp)}`
              : "No record"}
          </Td>
        </Tr>
        <Tr fontFamily="font.body" fontSize="md">
          <Td p="0.5rem">Total Yearly Operating Overage/Surplus</Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.cybTotalYearlySurplus
              ? `${formatNumber(plan?.cybTotalYearlySurplus)}`
              : 0}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.ytdaTotalYearlySurplus
              ? `${formatNumber(plan?.ytdaTotalYearlySurplus)}`
              : 0}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.pybTotalYearlySurplus
              ? `${formatNumber(plan?.pybTotalYearlySurplus)}`
              : previous?.cybTotalYearlySurplus
              ? `${formatNumber(previous?.cybTotalYearlySurplus)}`
              : "No record"}
          </Td>
          <Td p="0.5rem" textAlign="right">
            {plan?.pyaTotalYearlySurplus
              ? `${formatNumber(plan?.pyaTotalYearlySurplus)}`
              : previous?.ytdaTotalYearlySurplus
              ? `${formatNumber(previous?.ytdaTotalYearlySurplus)}`
              : "No record"}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default ViewTotalTable;
