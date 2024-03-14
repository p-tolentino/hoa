"use client";

import React, { useState, useMemo } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { PaymentHistoryColumn, columns } from "./columns";
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
import Link from "next/link";

interface PaymentHistoryClientProps {
  data: PaymentHistoryColumn[];
}

export const PaymentHistoryClient: React.FC<PaymentHistoryClientProps> = ({
  data,
}) => {
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Admin Directory Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState("showAll");
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Check status filter

      // Check category filter
      const categoryMatch =
        selectedCategoryFilter === "showAll" ||
        item.purpose === selectedCategoryFilter; // Assuming 'category' is the correct field

      return categoryMatch;
    });
  }, [data, selectedCategoryFilter]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Payment History"
          description={`View your payment history in the Homeowners Association (Total No. of Transactions = ${data.length})`}
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <Button size="sm" as={Link} href="/admin/finance">
            Go Back
          </Button>
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
        {/* <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All
              </SelectItem>
              <SelectItem value="ACTIVE">PAID</SelectItem>
              <SelectItem value="INACTIVE" defaultValue={1}>
                UNPAID
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
      </HStack>

      {/* Table */}
      {/* <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div> */}
      <div ref={componentPDF} style={{ width: "100%" }}>
        <DataTable columns={columns} data={filteredData} searchKey="paidBy" />
      </div>
    </>
  );
};
