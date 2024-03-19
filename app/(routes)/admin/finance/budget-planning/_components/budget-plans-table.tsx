"use client";

import { Heading } from "@/components/ui/heading";
import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Separator } from "@/components/ui/separator";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { BudgetPlan } from "@prisma/client";
import BackButton from "@/components/system/BackButton";

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
        <HStack>
          {/* Create Button */}
          <Button
            size="sm"
            colorScheme="yellow"
            as={Link}
            href="/admin/finance/budget-planning/create"
          >
            <AddIcon mr="10px" boxSize={3} />
            <Text fontSize="sm">Create Budget Plan</Text>
          </Button>
          <BackButton />
        </HStack>
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
                    href={`/admin/finance/budget-planning/${plan.id}`}
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
