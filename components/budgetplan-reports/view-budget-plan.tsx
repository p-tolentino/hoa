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

import ViewExpenseTable from "./expenses-view";
import ViewRevenueTable from "./revenue-view";
import ViewTotalTable from "./totals-view";
import { getBudget } from "@/server/data/budget-plan";

import { useEffect, useState } from "react";
import { BudgetPlan } from "@prisma/client";

interface ViewFormProps {
  initialData: BudgetPlan | null;
  previous: BudgetPlan | null;
}

export const ViewBudgetPlan: React.FC<ViewFormProps> = ({
  initialData,
  previous,
}) => {
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
        <h2 className="text-2xl font-bold">{initialData?.title}</h2>
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
          <Text>{initialData?.forYear}</Text>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
      <ViewRevenueTable plan={initialData} previous={previous} />
      <ViewExpenseTable plan={initialData} previous={previous} />
      <ViewTotalTable plan={initialData} previous={previous} />
    </>
  );
};

export default ViewBudgetPlan;
