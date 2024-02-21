"use client";

import { Heading } from "@/components/ui/heading";
import {
  Box,
  Button,
  Flex,
  Input,
  Spacer,
  Text,
  HStack,
} from "@chakra-ui/react";
import ExpenseTable from "./_components/expenses-table";
import RevenueTable from "./_components/revenue-table";
import TotalTable from "./_components/totals";
import { Separator } from "@/components/ui/separator";

export default function BudgetPlanning() {
  return (
    <>
      <Heading
        title="Budget Planning"
        description="Enter the organization's income, funds, and expenses."
      />
      <Separator className="mt-2 mb-5" />

      {/* Title, Current and Previous Fiscal Year */}
      <Flex w="100%">
        <Input w="30%" type="string" size="md" placeholder="Title" />
        <Spacer />
        <HStack>
          <Text
            fontSize="sm"
            w="full"
            fontFamily="font.heading"
            fontWeight="semibold"
          >
            Current Fiscal Year:
          </Text>
          <Input type="number" size="sm"></Input>
          <Text
            fontSize="sm"
            w="full"
            fontFamily="font.heading"
            fontWeight="semibold"
          >
            Previous Fiscal Year:
          </Text>
          <Input type="number" size="sm"></Input>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
      <RevenueTable />
      <ExpenseTable />
      <TotalTable />

      {/* Submit Button */}
      <Flex justifyContent="center" mt="4" w="100%">
        <Button type="submit" size="sm" colorScheme="green" ml={2}>
          Submit
        </Button>
      </Flex>
    </>
  );
}
