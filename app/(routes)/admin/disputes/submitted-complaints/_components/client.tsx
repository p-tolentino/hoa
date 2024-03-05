'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { SubmittedComplaintsColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { Flex, Button } from '@chakra-ui/react'
import Link from 'next/link'

interface SubmittedComplaintsClientProps {
  data: SubmittedComplaintsColumn[]
}

export const SubmittedComplaintsClient: React.FC<
  SubmittedComplaintsClientProps
> = ({ data }) => {
  return (
    <>
      <Flex justify='space-between'>
        <Heading
          title='Submitted Complaints'
          description="Monitor the progress of your submitted complaints to the Homeowners' Association."
        />
        <Button size='sm' colorScheme='gray' as={Link} href='/admin/disputes'>
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='title' />
    </>
  )
}
