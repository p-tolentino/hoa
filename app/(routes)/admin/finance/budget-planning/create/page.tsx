'use client'

import { Heading } from '@/components/ui/heading'
import { Button, Flex, Input, Text, ButtonGroup } from '@chakra-ui/react'
import ExpenseTable from './_components/expenses-table'
import RevenueTable from './_components/revenue-table'
import TotalTable from './_components/totals'
import { Separator } from '@/components/ui/separator'

// For Budget Plan Duration
import { CalendarIcon } from '@chakra-ui/icons'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { useState } from 'react'
import Link from 'next/link'

export default function CreateBudgetPlan () {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(2025, 0, 1)
  })

  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading
          title='Create Budget Plan'
          description="Enter the organization's income, funds, and expenses. Make sure to review the totals table at the bottom before submitting."
        />
        <ButtonGroup>
          {/* Cancel Button */}
          <Button
            type='reset'
            size='md'
            colorScheme='gray'
            as={Link}
            href='/admin/finance/budget-planning'
          >
            Cancel
          </Button>
          {/* Save Button */}
          <Button type='submit' size='md' colorScheme='green'>
            Save Budget Plan
          </Button>
        </ButtonGroup>
      </Flex>
      <Separator className='mt-2 mb-5' />

      <Flex w='100%' mt='2rem' mb='1rem' justifyContent='center'>
        {/* Budget Plan Title  */}
        <Input
          w='30%'
          mr='5rem'
          type='string'
          size='md'
          placeholder='Budget Plan Title'
        />

        {/* Budget Plan Duration */}
        <Flex alignItems='center'>
          <Text
            fontSize='sm'
            w='180px'
            fontFamily='font.heading'
            fontWeight='semibold'
          >
            Budget Plan Duration:
          </Text>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id='date'
                variant={'outline'}
                className={cn(
                  'w-[500px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      {/* Budget Planning Table */}
      <RevenueTable />
      <ExpenseTable />
      <TotalTable />
    </>
  )
}
