'use client'

import { ColumnDef } from '@tanstack/react-table'

export type ViolationLettersAndNoticesColumn = {
  id: string
  dateReceived: string
  violationType: string
  sender: string
  viewViolationLetterNotice: string
}

export const columns: ColumnDef<ViolationLettersAndNoticesColumn>[] = [
  {
    accessorKey: 'dateReceived',
    header: 'Date Received'
  },
  {
    accessorKey: 'violationType',
    header: 'Violation Type'
  },
  {
    accessorKey: 'sender',
    header: 'Sender'
  },
  {
    accessorKey: 'viewViolationLetterNotice',
    header: 'View Violation Letter/Notice',
    cell: ({ row }) => (
      <a
        href={'/admin/violations/letters-and-notices/sample'}
        className='hover:underline'
      >
        {row.original.viewViolationLetterNotice}
      </a>
    )
  }
]
