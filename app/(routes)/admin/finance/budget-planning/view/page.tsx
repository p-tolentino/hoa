'use client'

import { Heading } from '@/components/ui/heading'
import {
  Box,
  Button,
  Flex,
  Input,
  Spacer,
  Text,
  HStack,
  ButtonGroup
} from '@chakra-ui/react'
// import ExpenseTable from './_components/expenses-table'
// import RevenueTable from './_components/revenue-table'
// import TotalTable from './_components/totals'
import { Separator } from '@/components/ui/separator'

export default function ViewBudgetPlan () {
  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading
          title='View Budget Plan'
          description='View the budget plan of the HOA.'
        />
        <ButtonGroup>
          {/* Reset Fields Button */}
          <Button type='reset' size='md' colorScheme='gray'>
            Reset fields
          </Button>
          {/* Save Button */}
          <Button type='submit' size='md' colorScheme='green'>
            Save Budget Plan
          </Button>
        </ButtonGroup>
      </Flex>
      <Separator className='mt-2 mb-5' />

      {/* Title & Current Fiscal Year */}
      <Flex w='100%'>
        <h2 className='text-2xl font-bold'>Budget Plan Title</h2>
        <Spacer />
        <HStack>
          <Text
            fontSize='md'
            w='full'
            fontFamily='font.heading'
            fontWeight='semibold'
          >
            Fiscal Year:
          </Text>
          <Text>MM/DD/YYYY</Text>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
      {/* <RevenueTable />
      <ExpenseTable />
      <TotalTable /> */}
    </>
  )
}
