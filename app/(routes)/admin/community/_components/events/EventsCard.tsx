'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { MonthlyEventList } from './_components/MonthlyEventList'
import CreateEventButton from './_components/CreateEventButton'
import EventDetails from './_components/EventDetails'

export default function EventsCard () {
  return (
    <div>
      <Card className='h-[75vh]'>
        <CardHeader>
          <Flex justify='space-between'>
            <Box>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Create and view events within the HOA.
              </CardDescription>
            </Box>
            <CreateEventButton />
          </Flex>
        </CardHeader>
        <CardContent className='space-y-2'>
          <MonthlyEventList />
          <EventDetails />
        </CardContent>
      </Card>
    </div>
  )
}
