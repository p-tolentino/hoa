'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import NewTransactionButton from './NewTransactionButton'

import { TransactionColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface TransactionClientProps {
  data: TransactionColumn[]
}

export const TransactionClient: React.FC<TransactionClientProps> = ({
  data
}) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Income & Expense Management (${data.length})`}
          description='Manage the revenues and expenditures of the association'
        />
        <NewTransactionButton />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='purpose' />
    </>
  )
}
