'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type ListOfViolationsColumn = {
  id: string
  number: number
  status: string
  createdAt: string
  officerAssigned: string
  violationDate: string
  type: string
  description: string
  personsInvolved: string[]
  submittedBy: string
  progress: string
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
            : row.getValue('status') === 'Under Review'
            ? 'bg-yellow-600'
            : row.getValue('status') === 'Awaiting Payment'
            ? 'bg-orange-600'
            : 'display-none'
        )}
      >
        {' '}
        {row.getValue('status')}
      </Badge>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Submitted'
  },
  {
    accessorKey: 'submittedBy',
    header: 'Submitted By'
  },
  {
    accessorKey: 'progress',
    header: 'Enforcement Progress',
    cell: ({ row }) => (
      <a
        href={`/admin/violations/violation-record/view-progress/${row.original.id}`}
        className='hover:underline hover:text-blue-500'
      >
        {row.original.progress}
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
