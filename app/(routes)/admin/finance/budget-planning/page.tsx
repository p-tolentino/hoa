'use client'

import { Heading } from '@/components/ui/heading'
import { Button, Center, Flex, Text } from '@chakra-ui/react'
import { Separator } from '@/components/ui/separator'
import { AddIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function BudgetPlanning () {
  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading
          title='Budget Planning'
          description='View the list of all budget plans of the Homeowners Association.'
        />
        {/* Create Button */}
        <Button
          colorScheme='yellow'
          mb='10px'
          as={Link}
          href='/admin/finance/budget-planning/create'
        >
          <AddIcon mr='10px' />
          <Text fontSize={'lg'} fontFamily={'font.body'}>
            Create Budget Plan
          </Text>
        </Button>
      </Flex>
      <Separator className='mt-2 mb-5' />

      {/* Table Data for all Budget Plans saved */}
      <Center bg='lightgray' h='50vh'>
        Table Data of all Budget Plans saved.
        <Button as={Link} href='/admin/finance/budget-planning/view'>
          View Budget Plan
        </Button>
      </Center>
    </>
  )
}
