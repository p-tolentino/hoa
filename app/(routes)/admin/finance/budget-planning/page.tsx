"use client";

import { Heading } from "@/components/ui/heading";
import { Box } from "@chakra-ui/react";

export default function BudgetPlanning() {
  return (
    <>
      <Heading
        title="Budget Planning"
        description="Enter the organization's income, funds, and expenses."
      />
      <Box className="p-10"></Box>
    </>
  );
}
