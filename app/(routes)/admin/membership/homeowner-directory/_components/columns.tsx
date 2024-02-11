"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Status } from "@prisma/client";
import { ViewInfo } from "./view-info";

export type HomeownerColumn = {
  id: string;
  name: string;
  email: string;
  status: string;
  type: string;
  position: string;
  phoneNumber: string;
  birthDay: string;
  address: string;
  role: string;
  bio: string;
  image: string;
};

export const columns: ColumnDef<HomeownerColumn>[] = [
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
          row.getValue("status") === Status.ACTIVE
            ? "bg-green-700"
            : row.getValue("status") === Status.INACTIVE
            ? "bg-red-700"
            : row.getValue("status") === Status.PENDING
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
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-[#ffe492]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("position"),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-[#ffe492]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-[#ffe492]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("email"),
  },

  {
    id: "Member Information",
    cell: ({ row }) => <ViewInfo data={row.original} />,
  },
];
