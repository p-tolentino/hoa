"use client";

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
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Homeowners Payment Record (${data.length})`}
          description="Manage the payment records of Homeowners"
        />
      </div>
      <Separator />

      <HStack>
        {/* Select category to show */}
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Show All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All
              </SelectItem>
              <SelectItem value="finance">Association Dues</SelectItem>
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
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="showAll" className="font-semibold">
                Show All
              </SelectItem>
              {/* Active = Paid , Inactive = 'UNPAID' */}
              <SelectItem value="ACTIVE">PAID</SelectItem>
              <SelectItem value="INACTIVE" defaultValue={1}>
                UNPAID
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </HStack>

      {/* Table */}
      <DataTable columns={columns} data={data} searchKey="purpose" />
    </>
  );
};
