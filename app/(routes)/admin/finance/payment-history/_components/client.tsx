"use client";

import React, { useState, useMemo } from 'react';
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { PaymentHistoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { HStack, Spacer } from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentHistoryClientProps {
  data: PaymentHistoryColumn[];
}

export const PaymentHistoryClient: React.FC<PaymentHistoryClientProps> = ({
  data,
}) => {

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('showAll');
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Check status filter

      // Check category filter
      const categoryMatch = selectedCategoryFilter === 'showAll' || item.purpose === selectedCategoryFilter; // Assuming 'category' is the correct field

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
      </div>
      <Separator />

      <HStack>
        {/* Select category to show */}
        <Select value={selectedCategoryFilter} onValueChange={(value) => setSelectedCategoryFilter(value)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Show All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All
              </SelectItem>
              <SelectItem value="assocDues">Association Dues</SelectItem>
              <SelectItem value="dispute">Dispute Fines</SelectItem>
              <SelectItem value="violation">Violation Fines</SelectItem>
              <SelectItem value="facility">
                Facility Reservation Fees
              </SelectItem>
              <SelectItem value="maintenance">Maintenance Fees</SelectItem>
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
      <DataTable columns={columns} data={filteredData} searchKey="paidBy" />
    </>
  );
};
