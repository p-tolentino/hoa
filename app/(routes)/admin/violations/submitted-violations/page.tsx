import React from 'react'
import { SubmittedViolationsClient } from './_components/client'

export default function SubmittedViolations () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      officerInCharge: 'E&S Officer 1',
      title: 'ABCD',
      viewViolationForm: 'Sample Link to Violation Form 1'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      officerInCharge: 'E&S Officer 2',
      title: 'EFGH',
      viewViolationForm: 'Sample Link to Violation Form 2'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      officerInCharge: 'E&S Offocer 3',
      title: 'WSYZ',
      viewViolationForm: 'Sample Link to Violation Form 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <SubmittedViolationsClient data={data} />
      </div>
    </div>
  )
}
