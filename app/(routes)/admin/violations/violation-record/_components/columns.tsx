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
  step: number
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
          'w-[max-content] p-2 text-center justify-center',
          row.getValue('status') === 'Appealed'
            ? 'bg-green-700'
            : row.getValue('status') === 'Pending'
            ? 'bg-red-700'
            : row.getValue('status') === 'Under Review'
            ? 'bg-yellow-600'
            : row.getValue('status') === 'Closed'
            ? ''
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
    header: 'Officer Assigned',
    cell: ({ row }) => (
      <div>
        {row.original.officerAssigned === 'Unassigned' ? (
          <p className='text-gray-300 italic'>{row.original.officerAssigned}</p>
        ) : (
          <p>{row.original.officerAssigned}</p>
        )}
      </div>
    )
  },
  {
    accessorKey: 'progress',
    header: 'Enforcement Progress',
    cell: ({ row }) => (
      <div className='w-[150px]'>
        <a
          href={`/admin/violations/violation-record/view-progress/${row.original.id}`}
          className='text-sm hover:underline hover:text-blue-500'
        >
          {row.original.progress}
        </a>
      </div>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => <RowActions data={row.original} />
  }
]
