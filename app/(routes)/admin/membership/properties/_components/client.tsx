"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button, HStack } from "@chakra-ui/react";
import BackButton from "@/components/system/BackButton";

import { PropertyColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { AddProperty } from "./add-property";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";

interface PropertyClientProps {
  data: PropertyColumn[];
}

export const PropertyClient: React.FC<PropertyClientProps> = ({ data }) => {
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "HOA Properties Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Properties (${data.length})`}
          description="Manage properties within your area"
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <AddProperty />
          <BackButton />
        </HStack>
      </div>
      <Separator />
      {/* <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div> */}
      <div ref={componentPDF} style={{ width: "100%" }}>
        <DataTable columns={columns} data={data} searchKey="address" />
      </div>
    </>
  );
};
