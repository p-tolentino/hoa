import { Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";
import { BudgetPlan } from "@prisma/client";

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ViewRevenueTable = ({
  plan,
  previous,
}: {
  plan: BudgetPlan | null;
  previous: BudgetPlan | null;
}) => {
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
              Difference
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Association Dues</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybAssocDues ? `${formatNumber(plan?.cybAssocDues)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaAssocDues ? `${formatNumber(plan?.ytdaAssocDues)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaAssocDues
                ? `${formatNumber(plan?.cybAssocDues - plan?.ytdaAssocDues)}`
                : `${formatNumber(plan?.cybAssocDues!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Toll Fees</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybToll ? `${formatNumber(plan?.cybToll)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaToll ? `${formatNumber(plan?.ytdaToll)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaToll
                ? `${formatNumber(plan?.cybToll - plan?.ytdaToll)}`
                : `${formatNumber(plan?.cybToll!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Facility Rentals</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybFacility ? `${formatNumber(plan?.cybFacility)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaFacility ? `${formatNumber(plan?.ytdaFacility)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaFacility
                ? `${formatNumber(plan?.cybFacility - plan?.ytdaFacility)}`
                : `${formatNumber(plan?.cybFacility!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Renovation and Demolition Fees</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybConstruction
                ? `${formatNumber(plan?.cybConstruction)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaConstruction
                ? `${formatNumber(plan?.ytdaConstruction)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaConstruction
                ? `${formatNumber(
                    plan?.cybConstruction - plan?.ytdaConstruction
                  )}`
                : `${formatNumber(plan?.cybConstruction!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Car Sticker Receipts</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybCarSticker ? `${formatNumber(plan?.cybCarSticker)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaCarSticker
                ? `${formatNumber(plan?.ytdaCarSticker)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaCarSticker
                ? `${formatNumber(plan?.cybCarSticker - plan?.ytdaCarSticker)}`
                : `${formatNumber(plan?.cybCarSticker!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Other Revenues</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybOtherRev ? `${formatNumber(plan?.cybOtherRev)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaOtherRev ? `${formatNumber(plan?.ytdaOtherRev)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaOtherRev
                ? `${formatNumber(plan?.cybOtherRev - plan?.ytdaOtherRev)}`
                : `${formatNumber(plan?.cybOtherRev!!)}`}
            </Td>
          </Tr>

          <Tr h="3rem" fontFamily="font.body" bg="brand.400">
            <Td px="1rem">Total Yearly Revenue</Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.cybTotalYearlyRev
                ? `${formatNumber(plan?.cybTotalYearlyRev)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.ytdaTotalYearlyRev
                ? `${formatNumber(plan?.ytdaTotalYearlyRev)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.ytdaTotalYearlyRev
                ? `${formatNumber(
                    plan?.cybTotalYearlyRev - plan?.ytdaTotalYearlyRev
                  )}`
                : `${formatNumber(plan?.cybTotalYearlyRev!!)}`}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ViewRevenueTable;
