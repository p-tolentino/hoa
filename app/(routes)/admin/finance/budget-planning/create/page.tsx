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
import ExpenseTable from './_components/expenses-table'
import RevenueTable from './_components/revenue-table'
import TotalTable from './_components/totals'
import { Separator } from '@/components/ui/separator'

export default function CreateBudgetPlan () {
  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading
          title='Budget Planning'
          description="Enter the organization's income, funds, and expenses. Make sure to review the totals table at the bottom before submitting."
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
        <Input w='30%' type='string' size='md' placeholder='Title' />
        <Spacer />
        <HStack>
          <Text
            fontSize='sm'
            w='full'
            fontFamily='font.heading'
            fontWeight='semibold'
          >
            Current Fiscal Year:
          </Text>
          <Input type='number' size='sm'></Input>
        </HStack>
      </Flex>

      {/* Budget Planning Table */}
      <RevenueTable />
      <ExpenseTable />
      <TotalTable />
    </>
  )
}
