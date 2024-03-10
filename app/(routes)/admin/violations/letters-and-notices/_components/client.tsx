"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ViolationLettersAndNoticesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

interface ViolationLettersAndNoticesClientProps {
  data: ViolationLettersAndNoticesColumn[];
}

export const ViolationLettersAndNoticesClient: React.FC<
  ViolationLettersAndNoticesClientProps
> = ({ data }) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title="Violation Letters and Notices"
          description="View received Violation letters and notices from the Homeowners' Association."
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
