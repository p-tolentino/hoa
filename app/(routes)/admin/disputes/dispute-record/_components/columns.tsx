"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ListOfDisputesColumn = {
  id: string;
  status: string;
  dateSubmitted: string;
  submittedBy: string;
  viewDisputeForm: string;
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
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
  },
  {
    accessorKey: "submittedBy",
    header: "Submitted By",
  },
  {
    accessorKey: "viewDisputeForm",
    header: "View Dispute Form",
    cell: ({ row }) => (
      <a
        href={"/admin/disputes/dispute-record/view-progress"}
        className="hover:underline"
      >
        {row.original.viewDisputeForm}
      </a>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
