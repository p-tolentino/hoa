"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./row-actions";

export type ListOfReportsColumn = {
  id: string;
  dateSubmitted: string;
  submittedBy: string;
  title: string;
  viewViolationReport: string;
};

export const columns: ColumnDef<ListOfReportsColumn>[] = [
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
    accessorKey: "viewViolationReport",
    header: "View Violation Report",
  },
  {
    id: "actions",
    cell: (row) => {
      return <RowActions />;
    },
  },
];
