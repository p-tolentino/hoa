"use client";

import React, { useState, useMemo } from 'react';
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { PaymentRecordColumn, columns } from "./columns";
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

interface PaymentRecordClientProps {
  data: PaymentRecordColumn[];
}

export const PaymentRecordClient: React.FC<PaymentRecordClientProps> = ({
  data,
}) => {

  const [selectedStatusFilter, setSelectedStatusFilter] = useState('showAll');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('showAll');


  // Filter the data based on the selected status filter
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Check status filter
      const statusMatch = selectedStatusFilter === 'showAll' || item.status === selectedStatusFilter;
      // Check category filter
      const categoryMatch = selectedCategoryFilter === 'showAll' || item.purpose === selectedCategoryFilter; // Assuming 'category' is the correct field

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
              <SelectItem value="Association Dues">Association Dues</SelectItem>
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
        <Select value={selectedStatusFilter} onValueChange={(value) => setSelectedStatusFilter(value)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All
              </SelectItem>
              {/* Active = Paid , Inactive = 'UNPAID' */}
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="UNPAID" > Unpaid</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </HStack>

      {/* Table */}
      <DataTable columns={columns} data={filteredData} searchKey="purpose" />
    </>
  );
};
