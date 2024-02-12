"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { PaymentRecordColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

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
      <DataTable columns={columns} data={data} searchKey="purpose" />
    </>
  );
};
