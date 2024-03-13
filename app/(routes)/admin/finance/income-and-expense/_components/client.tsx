"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import NewTransactionButton from "./NewTransactionButton";

import { TransactionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Stack, Text, Button, HStack } from "@chakra-ui/react";
import { Hoa } from "@prisma/client";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";
import Link from "next/link";

interface TransactionClientProps {
  data: TransactionColumn[];
  hoaInfo: Hoa;
}

export const TransactionClient: React.FC<TransactionClientProps> = ({
  data,
  hoaInfo,
}) => {
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Revenue and Expense Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Revenue & Expense Management (${data.length})`}
          description="Manage the revenues and expenditures of the association"
        />
        <Stack lineHeight={0.8}>
          <Text fontFamily={"fonts.body"}>Total Funds:</Text>
          <Text fontSize={"3xl"} fontWeight={"bold"} color={"brand.500"}>
            P {new Intl.NumberFormat("en-US").format(hoaInfo.funds)}
          </Text>
        </Stack>
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <NewTransactionButton currentFunds={hoaInfo.funds} />
          <Button size="sm" as={Link} href="/admin/finance">
            Go Back
          </Button>
        </HStack>
      </div>
      <Separator />
      {/* <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div> */}
      <div ref={componentPDF} style={{ width: "100%" }}>
        <DataTable columns={columns} data={data} searchKey="purpose" />
      </div>
    </>
  );
};
