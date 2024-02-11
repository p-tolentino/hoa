"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { HomeownerColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface HomeownersClientProps {
  data: HomeownerColumn[];
}

export const HomeownersClient: React.FC<HomeownersClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage your system's registered users"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="email" />
    </>
  );
};
