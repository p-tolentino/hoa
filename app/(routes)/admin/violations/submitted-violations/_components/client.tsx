"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { SubmittedViolationsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

interface SubmittedViolationsClientProps {
  data: SubmittedViolationsColumn[];
}

export const SubmittedViolationsClient: React.FC<
  SubmittedViolationsClientProps
> = ({ data }) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading
          title="Submitted Violation Reports"
          description="Monitor the progress of your submitted violation reports to the Homeowners' Association."
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
