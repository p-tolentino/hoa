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
              Current Year Budget (CYB)
            </Th>
            <Th p="1rem" fontFamily="font.heading" w="300px" textAlign="right">
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
              {plan?.pybSalariesBenefits
                ? `${formatNumber(plan?.pybSalariesBenefits)}`
                : previous?.cybSalariesBenefits
                ? `${formatNumber(previous?.cybSalariesBenefits)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaSalariesBenefits
                ? `${formatNumber(plan?.pyaSalariesBenefits)}`
                : previous?.ytdaSalariesBenefits
                ? `${formatNumber(previous?.ytdaSalariesBenefits)}`
                : "No record"}
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
              {plan?.pybUtilities
                ? `${formatNumber(plan?.pybUtilities)}`
                : previous?.cybUtilities
                ? `${formatNumber(previous?.cybUtilities)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaUtilities
                ? `${formatNumber(plan?.pyaUtilities)}`
                : previous?.ytdaUtilities
                ? `${formatNumber(previous?.ytdaUtilities)}`
                : "No record"}
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
              {plan?.pybOfficeSupplies
                ? `${formatNumber(plan?.pybOfficeSupplies)}`
                : previous?.cybOfficeSupplies
                ? `${formatNumber(previous?.cybOfficeSupplies)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaOfficeSupplies
                ? `${formatNumber(plan?.pyaOfficeSupplies)}`
                : previous?.ytdaOfficeSupplies
                ? `${formatNumber(previous?.ytdaOfficeSupplies)}`
                : "No record"}
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
              {plan?.pybRepairMaintenance
                ? `${formatNumber(plan?.pybRepairMaintenance)}`
                : previous?.cybRepairMaintenance
                ? `${formatNumber(previous?.cybRepairMaintenance)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaRepairMaintenance
                ? `${formatNumber(plan?.pyaRepairMaintenance)}`
                : previous?.ytdaRepairMaintenance
                ? `${formatNumber(previous?.ytdaRepairMaintenance)}`
                : "No record"}
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
              {plan?.pybDonations
                ? `${formatNumber(plan?.pybDonations)}`
                : previous?.cybDonations
                ? `${formatNumber(previous?.cybDonations)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaDonations
                ? `${formatNumber(plan?.pyaDonations)}`
                : previous?.ytdaDonations
                ? `${formatNumber(previous?.ytdaDonations)}`
                : "No record"}
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
              {plan?.pybFurnituresFixtures
                ? `${formatNumber(plan?.pybFurnituresFixtures)}`
                : previous?.cybFurnituresFixtures
                ? `${formatNumber(previous?.cybFurnituresFixtures)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaFurnituresFixtures
                ? `${formatNumber(plan?.pyaFurnituresFixtures)}`
                : previous?.ytdaFurnituresFixtures
                ? `${formatNumber(previous?.ytdaFurnituresFixtures)}`
                : "No record"}
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
              {plan?.pybRepresentation
                ? `${formatNumber(plan?.pybRepresentation)}`
                : previous?.cybRepresentation
                ? `${formatNumber(previous?.cybRepresentation)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaRepresentation
                ? `${formatNumber(plan?.pyaRepresentation)}`
                : previous?.ytdaRepresentation
                ? `${formatNumber(previous?.ytdaRepresentation)}`
                : "No record"}
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
              {plan?.pybLegalProfessionalFees
                ? `${formatNumber(plan?.pybLegalProfessionalFees)}`
                : previous?.cybLegalProfessionalFees
                ? `${formatNumber(previous?.cybLegalProfessionalFees)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaLegalProfessionalFees
                ? `${formatNumber(plan?.pyaLegalProfessionalFees)}`
                : previous?.ytdaLegalProfessionalFees
                ? `${formatNumber(previous?.ytdaLegalProfessionalFees)}`
                : "No record"}
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
              {plan?.pybAdministrativeCosts
                ? `${formatNumber(plan?.pybAdministrativeCosts)}`
                : previous?.cybAdministrativeCosts
                ? `${formatNumber(previous?.cybAdministrativeCosts)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaAdministrativeCosts
                ? `${formatNumber(plan?.pyaAdministrativeCosts)}`
                : previous?.ytdaAdministrativeCosts
                ? `${formatNumber(previous?.ytdaAdministrativeCosts)}`
                : "No record"}
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
              {plan?.pybOtherExp
                ? `${formatNumber(plan?.pybOtherExp)}`
                : previous?.cybOtherExp
                ? `${formatNumber(previous?.cybOtherExp)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right">
              {plan?.pyaOtherExp
                ? `${formatNumber(plan?.pyaOtherExp)}`
                : previous?.ytdaOtherExp
                ? `${formatNumber(previous?.ytdaOtherExp)}`
                : "No record"}
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
              {plan?.pybTotalYearlyExp
                ? `${formatNumber(plan?.pybTotalYearlyExp)}`
                : previous?.cybTotalYearlyExp
                ? `${formatNumber(previous?.cybTotalYearlyExp)}`
                : "No record"}
            </Td>
            <Td px="2rem" textAlign="right" fontSize="md" fontWeight="bold">
              {plan?.pyaTotalYearlyExp
                ? `${formatNumber(plan?.pyaTotalYearlyExp)}`
                : previous?.ytdaTotalYearlyExp
                ? `${formatNumber(previous?.ytdaTotalYearlyExp)}`
                : "No record"}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ViewExpenseTable;
