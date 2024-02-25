'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React from 'react'

export default function DiscussionsCard () {
  return (
    <>
      <Card className='h-[70vh]'>
        <CardHeader>
          <CardTitle>Discussions</CardTitle>
          <CardDescription>
            Create and view discussions of Homeowners.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'></CardContent>
      </Card>
    </>
  )
}
