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

import ViewExpenseTable from "./expenses-view";
import ViewRevenueTable from "./revenue-view";
import ViewTotalTable from "./totals-view";
import { getBudget } from "@/server/data/budget-plan";

import { useEffect, useState } from "react";
import { BudgetPlan, Hoa } from "@prisma/client";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";
import BackButton from "@/components/system/BackButton";
import PdfView from "./pdf-view";

interface ViewFormProps {
  initialData: BudgetPlan | null;
  previous: BudgetPlan | null;
  hoaInfo: Hoa;
}

export const ViewBudgetPlan: React.FC<ViewFormProps> = ({
  initialData,
  previous,
  hoaInfo,
}) => {
  const documentTitle = `Budget Plan of ${initialData?.forYear} Report`;
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: documentTitle,
    //onAfterPrint: () => alert("Data saved in PDF"),
  });
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading
          title="View Budget Plan"
          description="View the budget plan of the HOA."
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <BackButton />
        </HStack>
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
            Calendar Year:
          </Text>
          <Text>{initialData?.forYear}</Text>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
       <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
      <PdfView initialData={initialData} previous={previous} hoaInfo={hoaInfo} title={documentTitle}/>
        </div>
      </div> 
      <div style={{ width: "100%" }}>
        <ViewRevenueTable plan={initialData} previous={previous} />
        <ViewExpenseTable plan={initialData} previous={previous} />
        <ViewTotalTable plan={initialData} previous={previous} />
      </div>
    </>
  );
};

export default ViewBudgetPlan;
