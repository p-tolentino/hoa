import React from 'react'
import { SubmittedDisputesClient } from './_components/client'

export default function SubmittedDisputes () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      officerInCharge: 'G&A Officer 1',
      title: 'ABCD',
      viewDisputeForm: 'Sample Link to Dispute Form 1'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      officerInCharge: 'G&A Officer 2',
      title: 'EFGH',
      viewDisputeForm: 'Sample Link to Dispute Form 2'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      officerInCharge: 'G&A Offocer 3',
      title: 'WSYZ',
      viewDisputeForm: 'Sample Link to Dispute Form 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <SubmittedDisputesClient data={data} />
      </div>
    </div>
  )
}
