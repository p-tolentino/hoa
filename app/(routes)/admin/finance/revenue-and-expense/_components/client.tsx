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
import BackButton from "@/components/system/BackButton";

interface TransactionClientProps {
  data: TransactionColumn[];
  hoaInfo: Hoa;
}

interface TableColumn {
  header: string;
  accessor: string;
}

export const TransactionClient: React.FC<TransactionClientProps> = ({
  data,
  hoaInfo,
}) => {

  const otherDataColumns: TableColumn[] = [
    { header: 'Date Issued', accessor: 'dateIssued' },
    { header: 'Type', accessor: 'type' },
    { header: 'Purpose', accessor: 'purpose' },
    { header: 'Amount', accessor: 'amount' },
    //{ header: 'Description', accessor: 'description' },
    { header: 'Date Submitted', accessor: 'dateSubmitted' },
    { header: 'Recorded By', accessor: 'recordedBy' },
    // Add more columns as needed
  ];

  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Revenue and Expense Report",
    //onAfterPrint: () => alert("Data saved in PDF"),
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
          <BackButton />
        </HStack>
      </div>
      <Separator />
      <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
        {hoaInfo && (
        <PDFTable 
          data={data}
          columns={otherDataColumns} 
          reportTitle="Revenue & Expense Transactions Report"
          reportSubtitle="View the list of all revenue and expenses transactions within the Homeowners' Association.          " 
          hoaInfo={hoaInfo}
          funds={hoaInfo.funds}
        />
        )}
        </div>
      </div> 
      <div style={{ width: "100%" }}>
        <DataTable columns={columns} data={data} searchKey="purpose" />
      </div>
    </>
  );
};
