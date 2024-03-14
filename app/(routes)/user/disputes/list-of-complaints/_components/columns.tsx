"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./row-actions";

export type ListOfComplaintsColumn = {
  id: string;
  dateSubmitted: string;
  submittedBy: string;
  title: string;
  viewComplaint: string;
};

export const columns: ColumnDef<ListOfComplaintsColumn>[] = [
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
  },
  {
    accessorKey: "submittedBy",
    header: "Submitted By",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "viewComplaint",
    header: "View Complaint",
  },
  {
    id: "actions",
    cell: (row) => {
      return <RowActions />;
    },
  },
];
