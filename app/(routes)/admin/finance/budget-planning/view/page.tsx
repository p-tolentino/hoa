"use client";

import { Heading } from "@/components/ui/heading";
import {
  Button,
  Flex,
  Spacer,
  Text,
  HStack,
  ButtonGroup,
} from "@chakra-ui/react";
import { Separator } from "@/components/ui/separator";

import ViewExpenseTable from "./_components/expenses-view";
import ViewRevenueTable from "./_components/revenue-view";
import ViewTotalTable from "./_components/totals-view";

export default function ViewBudgetPlan() {
  return (
    <>
      <Flex>
        <Heading
          title="View Budget Plan"
          description="View the budget plan of the HOA."
        />
      </Flex>
      <Separator className="mt-2 mb-5" />

      {/* Title & Current Fiscal Year */}
      <Flex w="100%">
        <h2 className="text-2xl font-bold">Budget Plan Title</h2>
        <Spacer />
        <HStack>
          <Text
            fontSize="md"
            w="full"
            fontFamily="font.heading"
            fontWeight="semibold"
          >
            Fiscal Year:
          </Text>
          <Text>MM/DD/YYYY</Text>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
      <ViewRevenueTable />
      <ViewExpenseTable />
      <ViewTotalTable />
    </>
  );
}
