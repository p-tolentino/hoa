'use client'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { format } from 'date-fns'

import SoaTableCategory from './_components/SoaTableCategory'
import SoaTableSummary from './_components/SoaTableSummary'

export default function StatementOfAccount () {
  const hoaName = "ABC Homeowners' Association"
  const homeownerName = 'Dela Cruz, Juan'
  const homeownerAddress = '123 Apple Street'
  const dateToday = format(new Date(), 'MM/dd/yyyy')

  const summarySoa = [
    {
      purpose: 'Association Dues',
      debit: '6,000.00',
      credit: '6,000.00'
    },
    {
      purpose: 'Violation Fees',
      debit: '0.00',
      credit: '50.00'
    },
    {
      purpose: 'Facility Reservation Fees',
      debit: '250.00',
      credit: '600.00'
    },
    {
      purpose: 'Maintenance Fees',
      debit: '50.00',
      credit: '50.00'
    }
  ]
  const associationDues = [
    {
      status: 'Paid',
      dateIssued: '01/01/2024',
      datePaid: '01/01/2024',
      description: 'Association Due: Jan 2024',
      amount: '3,000.00'
    },
    {
      status: 'Paid',
      dateIssued: '02/01/2024',
      datePaid: '02/01/2024',
      description: 'Association Due: Feb 2024',
      amount: '3,000.00'
    }
  ]
  const violationFees = [
    {
      status: 'Unpaid',
      dateIssued: '01/29/2024',
      datePaid: 'N/A',
      description: 'Wrongful Parking',
      amount: '50.00'
    }
  ]
  const facilityReservations = [
    {
      status: 'Paid',
      dateIssued: '02/02/2024',
      datePaid: '02/02/2024',
      description: 'Basketball Court Reservation',
      amount: '250.00'
    },
    {
      status: 'Unpaid',
      dateIssued: '02/01/2024',
      datePaid: 'N/A',
      description: 'Clubhouse Reservation',
      amount: '350.00'
    }
  ]
  const maintenanceFees = [
    {
      status: 'Paid',
      dateIssued: '01/29/2024',
      datePaid: '01/30/2024',
      description: 'Grass Cutting',
      amount: '50.00'
    }
  ]

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Statement of Account`} description={`${hoaName}`} />
      </div>
      <Separator className='mt-4 mb-6' />

      {/* Homeowner Details */}
      <Flex justifyContent='space-between' fontFamily='fonts.body'>
        <Flex>
          <Box mr='30px' mb='30px'>
            <Text>Homeowner Name:</Text>
            <Text>Address:</Text>
          </Box>
          <Box>
            <Text fontWeight='semibold'>{homeownerName}</Text>
            <Text fontWeight='semibold'>{homeownerAddress}</Text>
          </Box>
        </Flex>
        <Flex>
          <Text mr='20px'>Date Today:</Text>
          <Text fontWeight='semibold'>{dateToday}</Text>
        </Flex>
      </Flex>

      <VStack>
        {/* Select category to show */}
        <Select>
          <SelectTrigger className='w-[250px]'>
            <SelectValue placeholder='Show All' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='showAll' className='font-semibold'>
                Show All
              </SelectItem>
              <SelectItem value='finance'>Association Dues</SelectItem>
              <SelectItem value='dispute'>Dispute Fines</SelectItem>
              <SelectItem value='violation'>Violation Fines</SelectItem>
              <SelectItem value='facility'>
                Facility Reservation Fees
              </SelectItem>
              <SelectItem value='maintenance'>Maintenance Fees</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Box mt='15px'>
          {/* SOA Summary Table */}
          <SoaTableSummary data={summarySoa} />

          {/* REMOVE TEXT ONCE SELECT IS RESPONSIVE */}
          <Text fontStyle='italic'>
            * The tables below should be visible only when the corresponding
            category is selected from the dropdown *
          </Text>

          <SoaTableCategory data={associationDues} />
          <SoaTableCategory data={violationFees} />
          <SoaTableCategory data={facilityReservations} />
          <SoaTableCategory data={maintenanceFees} />
        </Box>
        {/* Pay Now Button */}
        <Button className='mt-5 text-white lg:text-xl font-semibold bg-[#355E3B]'>
          Pay Now
        </Button>
      </VStack>
    </>
  )
}
