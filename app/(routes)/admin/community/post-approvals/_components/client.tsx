"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { PendingPostColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button } from "@chakra-ui/react";
import BackButton from "@/components/system/BackButton";

interface PendingPostClientProps {
  data: PendingPostColumn[];
}

export const PendingPostClient: React.FC<PendingPostClientProps> = ({
  data,
}) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title={`Posts for Approval (${data.length})`}
          description="Manage user posts that will be reflected in the Community Engagement module"
        />
        <BackButton />
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};
