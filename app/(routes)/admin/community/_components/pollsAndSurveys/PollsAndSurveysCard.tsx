'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React from 'react'

export default function PollsAndSurveysCard () {
  return (
    <>
      <Card className='h-[70vh]'>
        <CardHeader>
          <CardTitle>Polls & Surveys</CardTitle>
          <CardDescription>
            View and answer polls and surveys posted by HOA Officers.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'></CardContent>
      </Card>
    </>
  )
}
