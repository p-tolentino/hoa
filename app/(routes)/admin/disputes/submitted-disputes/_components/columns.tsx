'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ViolationType } from '@prisma/client'

export type SubmittedDisputesColumn = {
  id: string
  number: number
  status: string
  createdAt: string
  officerAssigned: string
  disputeDate: string
  //violationInvolved: ViolationType | undefined | null
  type: string
  description: string
  personsInvolved: string
  submittedBy: string
  step: number
  progress: string
  letterSent: boolean
  updatedAt: string
  reasonToClose?: string
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
          'w-[150px] md:text-xs p-2 ml-3 text-center justify-center break-text',
          row.getValue('status') === 'FOR_REVIEW'
            ? 'bg-yellow-700'
            : row.getValue('status') === 'For Assignment'
            ? 'bg-yellow-800'
            : row.getValue('status') === 'Pending Dispute Letter'
            ? 'bg-orange-800'
            : row.getValue('status') === 'Discussion (Letter Sent)'
            ? 'bg-blue-900'
            : row.getValue('status') === 'Closed' &&
              row.original.reasonToClose === 'Resolved'
            ? ''
            : row.getValue('status') === 'Closed' &&
              row.original.reasonToClose === 'Unresolved'
            ? 'bg-green-700'
            : 'display-none'
        )}
      >
        {row.getValue('status')}{' '}
        {row.original.reasonToClose && `- ${row.original.reasonToClose}`}
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
  //   accessorKey: "officerAssigned",
  //   header: "Officer-in-Charge",
  //   cell: ({ row }) => (
  //     <span
  //       className={cn(
  //         !row.getValue("officerAssigned") ? "text-gray-300 italic" : ""
  //       )}
  //     >
  //       {row.getValue("officerAssigned")
  //         ? row.getValue("officerAssigned")
  //         : "Unassigned"}
  //     </span>
  //   ),
  // },
  {
    accessorKey: 'progress',
    header: 'Resolution Progress',
    cell: ({ row }) => (
      <div>
        <a
          href={`/admin/disputes/submitted-disputes/view-progress/${row.original.id}`}
          className='text-sm hover:underline hover:text-blue-500'
        >
          {row.original.progress}
        </a>
        <p className='text-xs text-gray-500'>
          Last updated on {row.original.updatedAt}
        </p>
      </div>
    )
  }
]
