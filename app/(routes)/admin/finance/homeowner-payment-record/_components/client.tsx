"use client";

import React, { useState, useMemo } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { PaymentRecordColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { HStack, Spacer, Button } from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";
import BackButton from "@/components/system/BackButton";

interface PaymentRecordClientProps {
  data: PaymentRecordColumn[];
}

export const PaymentRecordClient: React.FC<PaymentRecordClientProps> = ({
  data,
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("showAll");
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState("showAll");
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Homeowner Payment Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  // Filter the data based on the selected status filter
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Check status filter
      const statusMatch =
        selectedStatusFilter === "showAll" ||
        item.status === selectedStatusFilter;
      // Check category filter
      const categoryMatch =
        selectedCategoryFilter === "showAll" ||
        item.purpose === selectedCategoryFilter; // Assuming 'category' is the correct field

      return statusMatch && categoryMatch;
    });
  }, [data, selectedStatusFilter, selectedCategoryFilter]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Homeowners Payment Record"
          description={`Manage the payment records of Homeowners (Total No. of Transactions = ${data.length})`}
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <BackButton />
        </HStack>
      </div>
      <Separator />

      <HStack>
        {/* Select category to show */}
        <Select
          value={selectedCategoryFilter}
          onValueChange={(value) => setSelectedCategoryFilter(value)}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Show All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All (Purpose)
              </SelectItem>
              <SelectItem value="Association Dues">Association Dues</SelectItem>
              <SelectItem value="Dispute Fees">Dispute Fees</SelectItem>
              <SelectItem value="Violation Fines">Violation Fines</SelectItem>
              <SelectItem value="Facility Rentals">
                Facility Reservation Fees
              </SelectItem>
              <SelectItem value="Repair and Maintenance">
                Maintenance Fees
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Spacer />

        {/* Filter status to show */}
        <Select
          value={selectedStatusFilter}
          onValueChange={(value) => setSelectedStatusFilter(value)}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All (Status)
              </SelectItem>

              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="UNPAID"> Unpaid</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </HStack>

      {/* Table */}
      {/* <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div> */}
      <div ref={componentPDF} style={{ width: "100%" }}>
        <DataTable columns={columns} data={filteredData} searchKey="purpose" />
      </div>
    </>
  );
};
