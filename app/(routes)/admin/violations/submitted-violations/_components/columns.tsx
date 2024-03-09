"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SubmittedViolationsColumn = {
  id: string;
  status: string;
  createdAt: string;
  officerAssigned: string;
  violationDate: string;
  type: string;
  description: string;
  personsInvolved: string[];
  submittedBy: string;
};

export const columns: ColumnDef<SubmittedViolationsColumn>[] = [
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
          row.getValue("status") === "Resolved"
            ? "bg-green-700"
            : row.getValue("status") === "Pending"
            ? "bg-red-700"
            : row.getValue("status") === "In Process"
            ? "bg-yellow-600"
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
    accessorKey: "officerAssigned",
    header: "Officer-in-Charge",
    cell: ({ row }) => (
      <span
        className={cn(
          !row.getValue("officerAssigned") ? "text-gray-400 italic" : ""
        )}
      >
        {row.getValue("officerAssigned")
          ? row.getValue("officerAssigned")
          : "Unassigned"}
      </span>
    ),
  },
  {
    accessorKey: "viewViolationForm",
    header: "View Violation Form",
    cell: ({ row }) => (
      <a
        href={"/admin/violations/submitted-violations/view-progress"}
        className="hover:underline"
      >
        Violation Report Information
      </a>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
