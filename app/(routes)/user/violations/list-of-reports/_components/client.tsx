"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ListOfReportsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

interface ListOfReportsClientProps {
  data: ListOfReportsColumn[];
}

export const ListOfReportsClient: React.FC<ListOfReportsClientProps> = ({
  data,
}) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title="List of Violation Reports"
          description="Manage the submitted violation reports of Homeowners."
        />
        <Button size="sm" colorScheme="gray" as={Link} href="/admin/violations">
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};
