"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ViolationType } from "@prisma/client";

export type ListOfDisputesColumn = {
  id: string;
  number: number;
  status: string;
  createdAt: string;
  officerAssigned: string;
  disputeDate: string;
  violationInvolved: ViolationType | undefined | null;
  type: string;
  description: string;
  personsInvolved: string[];
  submittedBy: string;
  step: number;
  progress: string;
  letterSent: boolean;
};

export const columns: ColumnDef<ListOfDisputesColumn>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-[#ffe492]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        className={cn(
          "w-[max-content] p-2 text-center justify-center",
          row.getValue("status") === "Resolved"
            ? "bg-green-700"
            : row.getValue("status") === "Pending"
            ? "bg-red-700"
            : row.getValue("status") === "Under Review"
            ? "bg-yellow-600"
            : row.getValue("status") === "Unresolved"
            ? "bg-gray-300 text-black"
            : "display-none"
        )}
      >
        {" "}
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Submitted",
  },
  {
    accessorKey: "submittedBy",
    header: "Submitted By",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="w-[150px]">
        <p>{row.original.type}</p>
      </div>
    ),
  },
  {
    accessorKey: "officerAssigned",
    header: "Officer Assigned",
    cell: ({ row }) => (
      <span
        className={cn(
          !row.getValue("officerAssigned") ? "text-gray-300 italic" : ""
        )}
      >
        {row.getValue("officerAssigned")
          ? row.getValue("officerAssigned")
          : "Unassigned"}
      </span>
    ),
  },
  {
    accessorKey: "progress",
    header: "Resolution Progress",
    cell: ({ row }) => (
      <div className="w-[150px]">
        <a
          href={`/admin/disputes/dispute-record/view-progress/${row.original.id}`}
          className="text-sm hover:underline hover:text-blue-500"
        >
          {row.original.progress}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
