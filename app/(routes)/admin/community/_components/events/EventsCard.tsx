'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React from 'react'

export default function EventsCard () {
  return (
    <>
      <Card className='h-[70vh]'>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Create and view events within the HOA.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'></CardContent>
      </Card>
    </>
  )
}
