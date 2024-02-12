import { Heading } from '@/components/ui/heading'
import React from 'react'

export default function StatementOfAccount () {
  return (
    <div className='flex items-center justify-between'>
      <Heading
        title={`Statement of Account`}
        description="View your outstanding balance to the Homeowners' Association"
      />
    </div>
  )
}
