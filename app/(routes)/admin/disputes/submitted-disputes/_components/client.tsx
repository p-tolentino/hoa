'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { SubmittedDisputesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { Flex, Button } from '@chakra-ui/react'
import Link from 'next/link'

interface SubmittedDisputesClientProps {
  data: SubmittedDisputesColumn[]
}

export const SubmittedDisputesClient: React.FC<
  SubmittedDisputesClientProps
> = ({ data }) => {
  return (
    <>
      <Flex justify='space-between'>
        <Heading
          title='Submitted Dispute Forms'
          description="Monitor the progress of your submitted dispute forms to the Homeowners' Association."
        />
        <Button size='sm' colorScheme='gray' as={Link} href='/admin/disputes'>
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='dateSubmitted' />
    </>
  )
}
