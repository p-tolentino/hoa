"use client";

import { Heading } from "@/components/ui/heading";
import {
  Button,
  Center,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
} from "@chakra-ui/react";
import { Separator } from "@/components/ui/separator";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { BudgetPlan } from "@prisma/client";

interface TableRow {
  id: number;
  title: string;
  fiscalyear: number;
}

export const BudgetPlanning = ({
  budgetPlans,
}: {
  budgetPlans: BudgetPlan[];
}) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading
          title="Budget Planning"
          description="View the list of all budget plans of the Homeowners Association."
        />
        {/* Create Button */}
        <Button
          colorScheme="yellow"
          mb="10px"
          as={Link}
          href="/admin/finance/budget-planning/create"
        >
          <AddIcon mr="10px" />
          <Text fontSize="lg" fontFamily="font.body">
            Create Budget Plan
          </Text>
        </Button>
      </Flex>
      <Separator className="mt-2 mb-5" />

      {/* Table Data for all Budget Plans saved */}
      <VStack mt="1rem">
        <Table variant="simple" size="sm" mt="20px" w="50vw">
          <Thead bgColor="brand.300">
            <Tr h="3rem" fontSize="xs">
              <Th p="1rem" fontFamily="font.heading">
                Budget Plan Title
              </Th>
              <Th p="1rem" fontFamily="font.heading">
                Fiscal Year
              </Th>
              <Th p="1rem"></Th>
            </Tr>
          </Thead>
          <Tbody>
      {budgetPlans.map((plan) => (
    <Tr key={plan.id} fontFamily="font.body">
      <Td px="1rem">{plan.title}</Td>
      <Td px="2rem">{plan.forYear}</Td>
      <Td textAlign="center">
        <Button
          size="sm"
          as={Link}
          href={`/admin/finance/budget-planning/view?id=${plan.id}`}
        >
          View Detailed Budget Plan
        </Button>
      </Td>
    </Tr>
  ))}
          </Tbody>
        </Table>
      </VStack>
    </>
  );
};

export default BudgetPlanning;
