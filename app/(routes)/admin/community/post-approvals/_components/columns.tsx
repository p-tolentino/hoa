'use client'

import { ColumnDef } from '@tanstack/react-table'
import RowActions from './row-actions'

export type PendingPostColumn = {
  id: string
  dateSubmitted: string
  submittedBy: string
  title: string
  category: string
  description: string
}

export const columns: ColumnDef<PendingPostColumn>[] = [
  {
    accessorKey: 'dateSubmitted',
    header: 'Date Submitted'
  },
  {
    accessorKey: 'submittedBy',
    header: 'Submitted By'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    id: 'actions',
    cell: ({row}) => {
      return <RowActions data={row.original}/>
    }
  }
]
