'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type SubmittedViolationsColumn = {
  id: string
  status: string
  dateSubmitted: string
  officerInCharge: string
  viewViolationForm: string
}

export const columns: ColumnDef<SubmittedViolationsColumn>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:bg-[#ffe492]'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue('status') === 'Resolved'
            ? 'bg-green-700'
            : row.getValue('status') === 'Pending'
            ? 'bg-red-700'
            : row.getValue('status') === 'In Process'
            ? 'bg-yellow-600'
            : 'display-none'
        )}
      >
        {' '}
        {row.getValue('status')}
      </Badge>
    )
  },
  {
    accessorKey: 'dateSubmitted',
    header: 'Date Submitted'
  },
  {
    accessorKey: 'officerInCharge',
    header: 'Officer-in-Charge'
  },
  {
    accessorKey: 'viewViolationForm',
    header: 'View Violation Form',
    cell: ({ row }) => (
      <a
        href={'/admin/violations/submitted-violations/view-progress'}
        className='hover:underline'
      >
        {row.original.viewViolationForm}
      </a>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions data={row.original} />
  }
]
