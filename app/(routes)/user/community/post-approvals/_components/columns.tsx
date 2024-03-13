'use client'

import { ColumnDef } from '@tanstack/react-table'
import RowActions from './row-actions'

export type PendingPostColumn = {
  id: string
  dateSubmitted: string
  submittedBy: string
  title: string
  viewPost: string
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
    accessorKey: 'viewPost',
    header: 'View Post'
  },
  {
    id: 'actions',
    cell: row => {
      return <RowActions />
    }
  }
]
