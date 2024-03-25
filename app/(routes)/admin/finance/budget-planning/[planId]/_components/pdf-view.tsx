import {
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Heading,
    Box,
    VStack,
    Center,
    Divider,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  import ViewExpenseTable from "./expenses-view";
import ViewRevenueTable from "./revenue-view";
import ViewTotalTable from "./totals-view";
import { BudgetPlan, Hoa } from "@prisma/client";

  interface ViewFormProps {
    initialData: BudgetPlan | null;
    previous: BudgetPlan | null;
    hoaInfo: Hoa;
    title: string;
  }
  
  export default function PdfView({ initialData, previous, hoaInfo, title }:ViewFormProps) {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <VStack spacing={4} align="stretch" p={5}>
        <VStack spacing={1} align="center">
          <Heading fontSize="lg" fontFamily="font.heading">
            {hoaInfo?.name}
          </Heading>
          <Text fontSize="md" fontFamily="font.body">
            Contact Number: {hoaInfo?.contactNumber}
          </Text>
          <Text fontSize="sm" fontFamily="font.body">
            Date Generated: {currentDate}
          </Text>
          <Center w="full">
            <Heading fontSize="md" fontFamily="font.heading" textAlign="center">
              {title}
            </Heading>
          </Center>
        </VStack>
  
        <Divider />
  
        <Box>
          <Heading fontSize="md" fontFamily="font.heading" mb={4}>
            Revenue Details
          </Heading>
          <ViewRevenueTable plan={initialData} previous={previous} />
        </Box>
  
        <Divider />
  
        <Box>
          <Heading fontSize="md" fontFamily="font.heading" mb={4}>
            Expense Details
          </Heading>
          <ViewExpenseTable plan={initialData} previous={previous} />
        </Box>
  
        <Divider />
  
        <Box>
          <Heading fontSize="md" fontFamily="font.heading" mb={4}>
            Total Overview
          </Heading>
          <ViewTotalTable plan={initialData} previous={previous} />
        </Box>
      </VStack>
    );
  }