import React from 'react'
import { ListOfViolationsClient } from './_components/client'

export default function Violations () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      submittedBy: 'Dela Cruz, Juan (Homeowner)',
      enforcementProgress: 'Step 1: Violation Form Submission'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      submittedBy: 'Ibarra, Crisostomo (Homeowner)',
      enforcementProgress:
        'Step 4: Review by Environment and Security Committee'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      submittedBy: 'Dela Cruz, Juanita (Homeowner)',
      enforcementProgress: ''
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <ListOfViolationsClient data={data} />
      </div>
    </div>
  )
}
