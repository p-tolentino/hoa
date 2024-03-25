"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button, HStack } from "@chakra-ui/react";
import BackButton from "@/components/system/BackButton";

import { AdminColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";
import { Hoa } from "@prisma/client";

interface AdminsClientProps {
  data: AdminColumn[];
  hoaInfo: Hoa;
}

interface TableColumn {
  header: string;
  accessor: string;
}

export const AdminsClient: React.FC<AdminsClientProps> = ({ data, hoaInfo }: AdminsClientProps) => {

  const otherDataColumns: TableColumn[] = [
    { header: 'Position', accessor: 'position' },
    { header: 'Name', accessor: 'name' },
    { header: 'Phone Number', accessor: 'phoneNumber' },
    { header: 'Email', accessor: 'email' },
    // Add more columns as needed
  ];
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Admin Directory Report",
  //  onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Admins (${data.length})`}
          description="Manage your system administrators"
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
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
          reportTitle="Admin / Officer Directory Report"
          reportSubtitle="View the list of all admins and officers within the Homeowners' Association.          " 
          hoaInfo={hoaInfo}
        />
        )}
        </div>
      </div>
      <DataTable columns={columns} data={data} searchKey="email" />
    </>
  );
};
