'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React from 'react'

export default function BusinessForumCard () {
  return (
    <>
      <Card className='h-[70vh]'>
        <CardHeader>
          <CardTitle>Business Forum</CardTitle>
          <CardDescription>Promote and view businesses here.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'></CardContent>
      </Card>
    </>
  )
}
