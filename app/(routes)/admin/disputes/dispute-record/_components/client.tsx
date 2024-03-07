'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { ListOfDisputesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { Flex, Button } from '@chakra-ui/react'
import Link from 'next/link'

interface ListOfDisputesClientProps {
  data: ListOfDisputesColumn[]
}

export const ListOfDisputesClient: React.FC<ListOfDisputesClientProps> = ({
  data
}) => {
  return (
    <>
      <Flex justify='space-between'>
        <Heading
          title="Homeowners' Association Dispute Record"
          description='Manage the submitted dispute forms of Homeowners.'
        />
        <Button size='sm' colorScheme='gray' as={Link} href='/admin/disputes'>
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='dataSubmitted' />
    </>
  )
}
