'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { DisputeLettersAndNoticesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { Flex, Button } from '@chakra-ui/react'
import Link from 'next/link'

interface DisputeLettersAndNoticesClientProps {
  data: DisputeLettersAndNoticesColumn[]
}

export const DisputeLettersAndNoticesClient: React.FC<
  DisputeLettersAndNoticesClientProps
> = ({ data }) => {
  return (
    <>
      <Flex justify='space-between'>
        <Heading
          title='Dispute Letters and Notices'
          description="View received dispute letters and notices from the Homeowners' Association."
        />
        <Button size='sm' colorScheme='gray' as={Link} href='/admin/disputes'>
          Go Back
        </Button>
      </Flex>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='dateReceived' />
    </>
  )
}
