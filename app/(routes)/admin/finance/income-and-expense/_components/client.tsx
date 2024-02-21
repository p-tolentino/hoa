'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import NewTransactionButton from './NewTransactionButton'

import { TransactionColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { Stack, Text } from '@chakra-ui/react'
import { Hoa } from "@prisma/client";

interface TransactionClientProps {
  data: TransactionColumn[];
  hoaInfo: Hoa;
}


export const TransactionClient: React.FC<TransactionClientProps> = ({
  data,
  hoaInfo,
}) => {

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
           P {new Intl.NumberFormat('en-US').format(hoaInfo.funds)}
          </Text>
        </Stack>
        <NewTransactionButton currentFunds={hoaInfo.funds}/>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='title' />
    </>
  )
}
