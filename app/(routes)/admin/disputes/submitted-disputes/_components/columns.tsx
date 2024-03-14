'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type SubmittedDisputesColumn = {
  id: string
  number: number
  status: string
  createdAt: string
  officerAssigned: string
  disputeDate: string
  type: string
  description: string
  personsInvolved: string[]
  submittedBy: string
  step: number
  progress: string
}

export const columns: ColumnDef<SubmittedDisputesColumn>[] = [
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
          'w-[max-content] p-2 text-center justify-center',
          row.getValue('status') === 'Resolved'
            ? 'bg-green-700'
            : row.getValue('status') === 'Pending'
            ? 'bg-red-700'
            : row.getValue('status') === 'Under Review'
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
    accessorKey: 'createdAt',
    header: 'Date Submitted'
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className='w-[150px]'>
        <p>{row.original.type}</p>
      </div>
    )
  },
  {
    accessorKey: 'officerAssigned',
    header: 'Officer-in-Charge',
    cell: ({ row }) => (
      <span
        className={cn(
          !row.getValue('officerAssigned') ? 'text-gray-300 italic' : ''
        )}
      >
        {row.getValue('officerAssigned')
          ? row.getValue('officerAssigned')
          : 'Unassigned'}
      </span>
    )
  },
  {
    accessorKey: 'progress',
    header: 'Resolution Progress',
    cell: ({ row }) => (
      <div className='w-[150px]'>
        <a
          href={`/admin/disputes/submitted-disputes/view-progress/${row.original.id}`}
          className='text-sm hover:underline hover:text-blue-500'
        >
          {row.original.progress}
        </a>
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions data={row.original} />
  }
]
