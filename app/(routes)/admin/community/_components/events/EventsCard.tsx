'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Text, VStack } from '@chakra-ui/react'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

export default function EventsCard () {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <Card className='h-[70vh]'>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Create and view events within the HOA.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <VStack h='500px' mt='3rem'>
            <Text fontWeight='bold'>Google Calendar API here</Text>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='rounded-md border shadow'
            />
          </VStack>
        </CardContent>
      </Card>
    </>
  )
}
