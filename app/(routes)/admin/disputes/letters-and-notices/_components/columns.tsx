"use client";

import { Text } from "@chakra-ui/react";
import { Dispute, DisputeType, Violation, ViolationType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type DisputeLettersAndNoticesColumn = {
  id: string;
  type: string;
  recipient: string;
  meetDate?: string;
  meetTime?: string;
  venue?: string;
  sender: string;
  createdAt: string;
  dispute: Dispute;
  disputeType: DisputeType;
};

export const columns: ColumnDef<DisputeLettersAndNoticesColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Date Received",
  },
  {
    accessorKey: "disputeNumber",
    header: "Dispute Number",
    cell: ({ row }) => (
      <Text>{`#D${row.original.dispute.number
        .toString()
        .padStart(4, "0")}`}</Text>
    ),
  },
  {
    accessorKey: "disputeType",
    header: "Dispute Type",
    cell: ({ row }) => <span>{row.original.disputeType.title}</span>,
  },
  {
    accessorKey: "viewDisputeLetterNotice",
    header: "View Dispute Letter/Notice",
    cell: ({ row }) => (
      <a
        href={`/admin/disputes/letters-and-notices/notice?letterId=${row.original.id}&disputeId=${row.original.dispute.id}`}
        className="hover:underline hover:text-blue-500"
      >
        View Details
      </a>
    ),
  },
];
