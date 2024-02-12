'use client'

import { Heading } from '@/components/ui/heading'
import { Box } from '@chakra-ui/react'

export default function IncomeAndExpense () {
  return (
    <>
      <Heading
        title='Expense and Income Management'
        description="Enter the organization's revenues and expenditures, and access its reports"
      />
      <Box className='p-10'></Box>
    </>
  )
}
