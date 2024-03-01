"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ListOfComplaintsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

interface ListOfComplaintsClientProps {
  data: ListOfComplaintsColumn[];
}

export const ListOfComplaintsClient: React.FC<ListOfComplaintsClientProps> = ({
  data,
}) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title="List of Complaints"
          description="Manage the submitted complaints of Homeowners."
        />
        <Button size="sm" colorScheme="gray" as={Link} href="/admin/disputes">
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};
