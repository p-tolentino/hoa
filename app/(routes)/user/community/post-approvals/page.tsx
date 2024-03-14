import React from 'react'
import { PendingPostClient } from './_components/client'

export default function PostApprovals () {
  const data = [
    {
      id: '12345',
      dateSubmitted: '02/14/24',
      submittedBy: 'Dela Cruz, Juan (Homeowner)',
      title: 'ABCD',
      viewPost: 'Sample Link to Post 1'
    },
    {
      id: '54321',
      dateSubmitted: '02/27/24',
      submittedBy: 'Dela Cruz, Juanita (Homeowner)',
      title: 'WSYZ',
      viewPost: 'Sample Link to Post 2'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <PendingPostClient data={data} />
      </div>
    </div>
  )
}
