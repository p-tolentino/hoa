"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ListOfViolationsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

interface ListOfViolationsClientProps {
  data: ListOfViolationsColumn[];
}

export const ListOfViolationsClient: React.FC<ListOfViolationsClientProps> = ({
  data,
}) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title="Homeowners' Association Violation Record"
          description="Manage the submitted violation forms of Homeowners."
        />
        <Button size="sm" colorScheme="gray" as={Link} href="/admin/violations">
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="createdAt" />
    </>
  );
};
