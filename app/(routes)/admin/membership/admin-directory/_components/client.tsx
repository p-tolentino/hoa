"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button, Table, Th, Tr, Td, Thead, Tbody } from "@chakra-ui/react";

import { AdminColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";

interface AdminsClientProps {
  data: AdminColumn[];
}

export const AdminsClient: React.FC<AdminsClientProps> = ({ data }) => {
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Admin Directory",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Admins (${data.length})`}
          description="Manage your system administrators"
        />
        <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
          Generate PDF
        </Button>
      </div>
      <Separator />
      <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div>
      <DataTable columns={columns} data={data} searchKey="email" />
    </>
  );
};
