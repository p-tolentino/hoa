"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ListOfDisputesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";

interface ListOfDisputesClientProps {
  data: ListOfDisputesColumn[];
}

export const ListOfDisputesClient: React.FC<ListOfDisputesClientProps> = ({
  data,
}) => {
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Homeowners' Association Dispute Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title="Homeowners' Association Dispute Record"
          description="Manage the submitted dispute forms of Homeowners."
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <Button size="sm" as={Link} href="/admin/disputes">
            Go Back
          </Button>
        </HStack>
      </Flex>
      <Separator />
      {/* <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div> */}
      <div ref={componentPDF} style={{ width: "100%" }}>
        <DataTable columns={columns} data={data} searchKey="createdAt" />
      </div>
    </>
  );
};
