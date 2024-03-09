'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type ListOfViolationsColumn = {
  id: string
  status: string
  dateSubmitted: string
  submittedBy: string
  enforcementProgress: string
}

export const columns: ColumnDef<ListOfViolationsColumn>[] = [
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
    accessorKey: 'submittedBy',
    header: 'Submitted By'
  },
  {
    accessorKey: 'enforcementProgress',
    header: 'Enforcement Progress',
    cell: ({ row }) => (
      <a
        href={'/admin/violations/violation-record/view-progress'}
        className='hover:underline hover:text-blue-500'
      >
        {row.original.enforcementProgress}
      </a>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => <RowActions data={row.original} />
  }
]
