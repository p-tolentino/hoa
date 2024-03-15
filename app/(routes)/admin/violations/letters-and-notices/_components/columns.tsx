"use client";

import { Text } from "@chakra-ui/react";
import { Violation, ViolationType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type ViolationLettersAndNoticesColumn = {
  id: string;
  type: string;
  recipient: string;
  meetDate?: string;
  venue?: string;
  sender: string;
  createdAt: string;
  violation: Violation;
  violationType: ViolationType;
};

export const columns: ColumnDef<ViolationLettersAndNoticesColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Date Received",
  },
  {
    accessorKey: "violationNumber",
    header: "Violation Number",
    cell: ({ row }) => (
      <Text>{`#V${row.original.violation.number
        .toString()
        .padStart(4, "0")}`}</Text>
    ),
  },
  {
    accessorKey: "violationType",
    header: "Violation Type",
    cell: ({ row }) => <span>{row.original.violationType.title}</span>,
  },
  {
    accessorKey: "viewViolationLetterNotice",
    header: "",
    cell: ({ row }) => (
      <a
        href={
          row.original.type === "violationLetter"
            ? `/admin/violations/letters-and-notices/letter?letterId=${row.original.id}&violationId=${row.original.violation.id}&violationTypeName=${row.original.violationType.name}`
            : `/admin/violations/letters-and-notices/notice?noticeId=${row.original.id}&violationId=${row.original.violation.id}&violationTypeName=${row.original.violationType.name}`
        }
        className="hover:underline hover:text-blue-500"
      >
        View Details
      </a>
    ),
  },
];
