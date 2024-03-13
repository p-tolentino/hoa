'use client'

import { Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'

export type DisputeLettersAndNoticesColumn = {
  id: string
  createdAt: string
  disputeNumber: string
  disputeType: string
  viewDisputeLetterNotice: string
  // recipient: string,
  // sender: string,
  // meetDate?: string,
  // venue?: string
}

export const columns: ColumnDef<DisputeLettersAndNoticesColumn>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date Received'
  },
  {
    accessorKey: 'disputeNumber',
    header: 'Dispute Number',
    cell: ({ row }) => <Text>{row.original.id}</Text>
  },
  {
    accessorKey: 'disputeType',
    header: 'Dispute Type'
  },
  {
    accessorKey: 'viewDisputeLetterNotice',
    header: 'View Dispute Letter/Notice',
    cell: ({ row }) => (
      <a
        href={
          row.original.viewDisputeLetterNotice.toLowerCase() === 'letter'
            ? `/admin/disputes/letters-and-notices/letter`
            : `/admin/disputes/letters-and-notices/notice`
        }
        className='hover:underline hover:text-blue-500'
      >
        View{' '}
        <span className='capitalize'>
          {row.original.viewDisputeLetterNotice.toLowerCase()}
        </span>
      </a>
    )
  }
]
