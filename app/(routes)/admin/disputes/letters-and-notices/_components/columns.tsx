'use client'

import { ColumnDef } from '@tanstack/react-table'

export type DisputeLettersAndNoticesColumn = {
  id: string
  dateReceived: string
  disputeType: string
  sender: string
  viewDisputeLetterNotice: string
}

export const columns: ColumnDef<DisputeLettersAndNoticesColumn>[] = [
  {
    accessorKey: 'dateReceived',
    header: 'Date Received'
  },
  {
    accessorKey: 'disputeType',
    header: 'Dispute Type'
  },
  {
    accessorKey: 'sender',
    header: 'Sender'
  },
  {
    accessorKey: 'viewDisputeLetterNotice',
    header: 'View Dispute Letter/Notice',
    cell: ({ row }) => (
      <a
        href={'/admin/disputes/letters-and-notices/sample'}
        className='hover:underline'
      >
        {row.original.viewDisputeLetterNotice}
      </a>
    )
  }
]
