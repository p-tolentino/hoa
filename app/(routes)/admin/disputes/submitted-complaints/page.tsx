import React from 'react'
import { SubmittedComplaintsClient } from './_components/client'

export default function SubmittedComplaints () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      officerInCharge: 'G&A Officer 1',
      title: 'ABCD',
      viewComplaint: 'Sample Link to Complaint 1'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      officerInCharge: 'G&A Officer 2',
      title: 'EFGH',
      viewComplaint: 'Sample Link to Complaint 2'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      officerInCharge: 'G&A Offocer 3',
      title: 'WSYZ',
      viewComplaint: 'Sample Link to Complaint 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <SubmittedComplaintsClient data={data} />
      </div>
    </div>
  )
}
