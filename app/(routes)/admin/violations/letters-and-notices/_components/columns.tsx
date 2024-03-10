'use client'

import { Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'

export type ViolationLettersAndNoticesColumn = {
  id: string
  dateReceived: string
  violationNumber: string
  violationType: string
  viewViolationLetterNotice: string
}

export const columns: ColumnDef<ViolationLettersAndNoticesColumn>[] = [
  {
    accessorKey: 'dateReceived',
    header: 'Date Received'
  },
  {
    accessorKey: 'violationNumber',
    header: 'Violation Number',
    cell: ({ row }) => <Text>{`#V00${row.original.violationNumber}`}</Text>
  },
  {
    accessorKey: 'violationType',
    header: 'Violation Type'
  },
  {
    accessorKey: 'viewViolationLetterNotice',
    header: '',
    cell: ({ row }) => (
      <a
        href={
          row.original.viewViolationLetterNotice.includes('Letter')
            ? '/admin/violations/letters-and-notices/sample-letter'
            : '/admin/violations/letters-and-notices/sample-notice'
        }
        className='hover:underline hover:text-blue-500'
      >
        {row.original.viewViolationLetterNotice}
      </a>
    )
  }
]
