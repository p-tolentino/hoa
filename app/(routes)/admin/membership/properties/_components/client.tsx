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
import { Hoa } from "@prisma/client";


interface PropertyClientProps {
  data: PropertyColumn[];
  hoaInfo: Hoa;
}
interface TableColumn {
  header: string;
  accessor: string;
}

export const PropertyClient: React.FC<PropertyClientProps> = ({ data, hoaInfo }:PropertyClientProps) => {
  const otherDataColumns: TableColumn[] = [
    { header: 'Address', accessor: 'address' },
    { header: 'Lot Number', accessor: 'lotNumber' },
    { header: 'Lot Size', accessor: 'lotSize' },
    { header: 'Purchase Date', accessor: 'purchaseDate' },
    // Add more columns as needed
  ];
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "HOA Properties Report",
   // onAfterPrint: () => alert("Data saved in PDF"),
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
      <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
        {hoaInfo && (
        <PDFTable 
          data={data}
          columns={otherDataColumns} 
          reportTitle="Property Information Report"
          reportSubtitle="View the list of all Property Information" 
          hoaInfo={hoaInfo}
        />
        )}
        </div>
      </div>
        <DataTable columns={columns} data={data} searchKey="address" />
    </>
  );
};
