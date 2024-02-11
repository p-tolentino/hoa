"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { AdminColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface AdminsClientProps {
  data: AdminColumn[];
}

export const AdminsClient: React.FC<AdminsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Admins (${data.length})`}
          description="Feel free to contact and meet your officers!"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="email" />
    </>
  );
};
