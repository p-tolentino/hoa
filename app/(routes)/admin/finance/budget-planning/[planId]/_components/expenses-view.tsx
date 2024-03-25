import { Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";
import { BudgetPlan } from "@prisma/client";

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ViewExpenseTable = ({
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
              Expenses
            </Th>
            <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
              Year Budget for {plan?.forYear}
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
            <Td px="1rem">Salaries and Benefits</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybSalariesBenefits
                ? `${formatNumber(plan?.cybSalariesBenefits)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaSalariesBenefits
                ? `${formatNumber(plan?.ytdaSalariesBenefits)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaSalariesBenefits
                ? `${formatNumber(
                    plan?.cybSalariesBenefits - plan?.ytdaSalariesBenefits
                  )}`
                : `${formatNumber(plan?.cybSalariesBenefits!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Utilities</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybUtilities ? `${formatNumber(plan?.cybUtilities)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaUtilities ? `${formatNumber(plan?.ytdaUtilities)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaUtilities
                ? `${formatNumber(plan?.cybUtilities - plan?.ytdaUtilities)}`
                : `${formatNumber(plan?.cybUtilities!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Office Supplies</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybOfficeSupplies
                ? `${formatNumber(plan?.cybOfficeSupplies)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaOfficeSupplies
                ? `${formatNumber(plan?.ytdaOfficeSupplies)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaOfficeSupplies
                ? `${formatNumber(
                    plan?.cybOfficeSupplies - plan?.ytdaOfficeSupplies
                  )}`
                : `${formatNumber(plan?.cybOfficeSupplies!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Repair and Maintenance</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybRepairMaintenance
                ? `${formatNumber(plan?.cybRepairMaintenance)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaRepairMaintenance
                ? `${formatNumber(plan?.ytdaRepairMaintenance)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaRepairMaintenance
                ? `${formatNumber(
                    plan?.cybRepairMaintenance - plan?.ytdaRepairMaintenance
                  )}`
                : `${formatNumber(plan?.cybRepairMaintenance!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Donations</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybDonations ? `${formatNumber(plan?.cybDonations)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaDonations ? `${formatNumber(plan?.ytdaDonations)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaDonations
                ? `${formatNumber(plan?.cybDonations - plan?.ytdaDonations)}`
                : `${formatNumber(plan?.cybDonations!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Furnitures and Fixtures</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybFurnituresFixtures
                ? `${formatNumber(plan?.cybFurnituresFixtures)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaFurnituresFixtures
                ? `${formatNumber(plan?.ytdaFurnituresFixtures)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaFurnituresFixtures
                ? `${formatNumber(
                    plan?.cybFurnituresFixtures - plan?.ytdaFurnituresFixtures
                  )}`
                : `${formatNumber(plan?.cybFurnituresFixtures!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Representation Expenses</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybRepresentation
                ? `${formatNumber(plan?.cybRepresentation)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaRepresentation
                ? `${formatNumber(plan?.ytdaRepresentation)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaRepresentation
                ? `${formatNumber(
                    plan?.cybRepresentation - plan?.ytdaRepresentation
                  )}`
                : `${formatNumber(plan?.cybRepresentation!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Legal & Professional Fees</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybLegalProfessionalFees
                ? `${formatNumber(plan?.cybLegalProfessionalFees)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaLegalProfessionalFees
                ? `${formatNumber(plan?.ytdaLegalProfessionalFees)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaLegalProfessionalFees
                ? `${formatNumber(
                    plan?.cybLegalProfessionalFees -
                      plan?.ytdaLegalProfessionalFees
                  )}`
                : `${formatNumber(plan?.cybLegalProfessionalFees!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Administrative Costs</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybAdministrativeCosts
                ? `${formatNumber(plan?.cybAdministrativeCosts)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaAdministrativeCosts
                ? `${formatNumber(plan?.ytdaAdministrativeCosts)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaAdministrativeCosts
                ? `${formatNumber(
                    plan?.cybAdministrativeCosts - plan?.ytdaAdministrativeCosts
                  )}`
                : `${formatNumber(plan?.cybAdministrativeCosts!!)}`}
            </Td>
          </Tr>

          <Tr fontFamily="font.body" fontSize="sm">
            <Td px="1rem">Other Expenses</Td>
            <Td px="2rem" textAlign="right">
              {plan?.cybOtherExp ? `${formatNumber(plan?.cybOtherExp)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaOtherExp ? `${formatNumber(plan?.ytdaOtherExp)}` : 0}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.ytdaOtherExp
                ? `${formatNumber(plan?.cybOtherExp - plan?.ytdaOtherExp)}`
                : `${formatNumber(plan?.cybOtherExp!!)}`}
            </Td>
          </Tr>

          <Tr h="3rem" fontFamily="font.body" bg="brand.400">
            <Td px="1rem">Total Yearly Expense</Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.cybTotalYearlyExp
                ? `${formatNumber(plan?.cybTotalYearlyExp)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.ytdaTotalYearlyExp
                ? `${formatNumber(plan?.ytdaTotalYearlyExp)}`
                : 0}
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.ytdaTotalYearlyExp
                ? `${formatNumber(
                    plan?.cybTotalYearlyExp - plan?.ytdaTotalYearlyExp
                  )}`
                : `${formatNumber(plan?.cybTotalYearlyExp!!)}`}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ViewExpenseTable;
