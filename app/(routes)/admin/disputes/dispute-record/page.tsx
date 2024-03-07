import React from 'react'
import { ListOfDisputesClient } from './_components/client'

export default function Disputes () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      submittedBy: 'Dela Cruz, Juan (Homeowner)',
      viewDisputeForm: 'Sample Link to Complaint 1'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      submittedBy: 'Ibarra, Crisostomo (Homeowner)',
      viewDisputeForm: 'Sample Link to Complaint 2'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      submittedBy: 'Dela Cruz, Juanita (Homeowner)',
      viewDisputeForm: 'Sample Link to Complaint 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <ListOfDisputesClient data={data} />
      </div>
    </div>
  )
}
