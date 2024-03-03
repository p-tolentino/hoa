import React from 'react'
import { ListOfComplaintsClient } from './_components/client'

export default function Complaints () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      submittedBy: 'Dela Cruz, Juan (Homeowner)',
      title: 'ABCD',
      viewComplaint: 'Sample Link to Complaint 1'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      submittedBy: 'Ibarra, Crisostomo (Homeowner)',
      title: 'EFGH',
      viewComplaint: 'Sample Link to Complaint 2'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      submittedBy: 'Dela Cruz, Juanita (Homeowner)',
      title: 'WSYZ',
      viewComplaint: 'Sample Link to Complaint 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <ListOfComplaintsClient data={data} />
      </div>
    </div>
  )
}
