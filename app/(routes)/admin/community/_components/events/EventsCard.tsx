'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { MonthlyEventList } from './_components/MonthlyEventList'
import CreateEventButton from './_components/CreateEventButton'
import EventDetails from './_components/EventDetails'

export default function EventsCard () {
  return (
    <div>
      <Card className='h-[70vh]'>
        <Flex justifyContent='space-between'>
          <CardHeader>
            <CardTitle>Business Forum</CardTitle>
            <CardDescription>
              Promote your business and view the businesses of Homeowners.
            </CardDescription>
          </CardHeader>
          <HStack p='20px'>
            {/* Create Event Button*/}
            <CreateEventButton />
          </HStack>
        </Flex>
        <CardContent className='space-y-2 w-[58vw]'>
          <MonthlyEventList />
          <EventDetails />
        </CardContent>
      </Card>
    </div>
  )
}
