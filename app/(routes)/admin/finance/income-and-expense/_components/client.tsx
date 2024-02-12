'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import NewTransactionButton from './NewTransactionButton'

import { TransactionColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { Stack, Text } from '@chakra-ui/react'

interface TransactionClientProps {
  data: TransactionColumn[]
}

export const TransactionClient: React.FC<TransactionClientProps> = ({
  data
}) => {
  const totalFunds = '100,000'

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Income & Expense Management (${data.length})`}
          description='Manage the revenues and expenditures of the association'
        />
        <Stack lineHeight={0.8}>
          <Text fontFamily={'fonts.body'}>Total Funds:</Text>
          <Text fontSize={'3xl'} fontWeight={'bold'} color={'brand.500'}>
            P{totalFunds}
          </Text>
        </Stack>
        <NewTransactionButton />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='title' />
    </>
  )
}
