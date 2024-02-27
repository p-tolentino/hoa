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
import { getBudget } from "@/server/data/budget-plan";
import { BudgetPlan } from "@prisma/client";


import { useEffect, useState } from 'react';


const ViewBudgetPlan = () => {
  const [budget, setBudget] = useState<BudgetPlan | null>(null);
  const [budgetId, setBudgetId] = useState<string | null>(null);


  useEffect(() => {
    // Ensure window is defined (indicating client-side rendering)
    if (typeof window !== "undefined") {
      // Create URLSearchParams object from the current URL
      const searchParams = new URLSearchParams(window.location.search);
      // Get the 'id' query parameter and set it to state
      const paramId = searchParams.get('id');
      setBudgetId(paramId)
      console.log(paramId)
    }
  }, []);

  useEffect(() => {
    const fetchBudgetPlan = async () => {
      if (budgetId) { // Ensure budgetId is not null
        try {
          console.log(`Fetching budget plan for ID: ${budgetId}`); // Debugging
          const badge = await getBudget(budgetId);
          console.log('Budget Plan:', badge);
          setBudget(badge);
        } catch (error) {
          console.error('Failed to fetch budget plan:', error);
        }
      }
    };
  
    fetchBudgetPlan();
  }, [budgetId]);


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
        <h2 className="text-2xl font-bold">{budget?.title}</h2>
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
          <Text>{budget?.forYear}</Text>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
      <ViewRevenueTable />
      <ViewExpenseTable />
      <ViewTotalTable />
    </>
  );
}

export default ViewBudgetPlan;
