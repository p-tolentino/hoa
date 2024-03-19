'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type SubmittedViolationsColumn = {
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
          'w-[150px] md:text-xs p-2 ml-3 text-center justify-center break-text',
          row.getValue('status') === 'For Review'
            ? 'bg-yellow-700'
            : row.getValue('status') === 'Invalid'
            ? 'bg-red-800'
            : row.getValue('status') === 'For Assignment'
            ? 'bg-yellow-800'
            : row.getValue('status') === 'Pending Violation Letter'
            ? 'bg-orange-800'
            : row.getValue('status') === 'Negotiating (Letter Sent)'
            ? 'bg-blue-900'
            : row.getValue('status') === 'Closed; Penalty Fee in SOA'
            ? ''
            : row.getValue('status') === 'Closed; Appealed'
            ? 'bg-green-700'
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
      <div className='w-[200px]'>
        <p>{row.original.type}</p>
      </div>
    )
  },
  // {
  //   accessorKey: 'officerAssigned',
  //   header: 'Officer-in-Charge',
  //   cell: ({ row }) => (
  //     <span
  //       className={cn(
  //         !row.getValue('officerAssigned') ? 'text-gray-300 italic' : ''
  //       )}
  //     >
  //       {row.getValue('officerAssigned')
  //         ? row.getValue('officerAssigned')
  //         : 'Unassigned'}
  //     </span>
  //   )
  // },
  {
    accessorKey: 'progress',
    header: 'Enforcement Progress',
    cell: ({ row }) => (
      <div className='w-[150px]'>
        <a
          href={`/admin/violations/submitted-violations/view-progress/${row.original.id}`}
          className='text-sm hover:underline hover:text-blue-500'
        >
          {row.original.progress}
        </a>
        <p className='text-gray-500 text-xs'>
          Last updated on March 19, 2024 at 01:00 PM
        </p>
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActions data={row.original} />
  }
]
