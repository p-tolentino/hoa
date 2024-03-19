"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PersonalInfo } from "@prisma/client";

export type ListOfViolationsColumn = {
  id: string;
  number: number;
  status: string;
  createdAt: string;
  officerAssigned: PersonalInfo | null | undefined;
  violationDate: string;
  type: string;
  description: string;
  personsInvolved: PersonalInfo[];
  submittedBy: PersonalInfo | null | undefined;
  step: number;
  progress: string;
  documents: string[];
  priority: string;
  letterSent: boolean;
  updatedAt: string;
  reasonToClose?: string;
};

export const columns: ColumnDef<ListOfViolationsColumn>[] = [
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
          "w-[150px] md:text-xs p-2 ml-3 text-center justify-center break-text",
          row.getValue("status") === "For Review"
            ? "bg-yellow-700"
            : row.getValue("status") === "Invalid"
            ? "bg-red-800"
            : row.getValue("status") === "For Assignment"
            ? "bg-yellow-800"
            : row.getValue("status") === "Pending Violation Letter"
            ? "bg-orange-800"
            : row.getValue("status") === "Negotiating (Letter Sent)"
            ? "bg-blue-900"
            : row.getValue("status") === "Closed" &&
              row.original.reasonToClose === "Penalty Fee Charged to SOA"
            ? ""
            : row.getValue("status") === "Closed" &&
              row.original.reasonToClose === "Appealed"
            ? "bg-green-700"
            : "display-none"
        )}
      >
        {row.getValue("status")}{" "}
        {row.original.reasonToClose && `- ${row.original.reasonToClose}`}
      </Badge>
    ),
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Date Submitted'
  // },
  // {
  //   accessorKey: 'submittedBy',
  //   header: 'Submitted By'
  // },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="w-[200px]">
        <p>{row.original.type}</p>
      </div>
    ),
  },
  // {
  //   accessorKey: 'officerAssigned',
  //   header: 'Officer Assigned',
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.officerAssigned === 'Unassigned' ? (
  //         <p className='italic text-gray-300'>{row.original.officerAssigned}</p>
  //       ) : (
  //         <p>{row.original.officerAssigned}</p>
  //       )}
  //     </div>
  //   )
  // },
  {
    accessorKey: "progress",
    header: "Enforcement Progress",
    cell: ({ row }) => (
      <div>
        <a
          href={`/admin/violations/violation-record/view-progress/${row.original.id}`}
          className="text-sm hover:underline hover:text-blue-500"
        >
          {row.original.progress}
        </a>
        <p className="text-xs text-gray-500">
          Last updated on {row.original.updatedAt}
        </p>
      </div>
    ),
  },
];
