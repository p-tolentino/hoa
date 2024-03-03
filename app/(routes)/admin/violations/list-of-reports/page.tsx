import React from 'react'
import { ListOfReportsClient } from './_components/client'

export default function ViolationReports () {
  const data = [
    {
      id: '12345',
      status: 'Pending',
      dateSubmitted: '02/14/24',
      submittedBy: 'Dela Cruz, Juan (Homeowner)',
      title: 'ABCD',
      viewViolationReport: 'Sample Link to Violation 1'
    },
    {
      id: '67890',
      status: 'In Process',
      dateSubmitted: '02/20/24',
      submittedBy: 'Ibarra, Crisostomo (Homeowner)',
      title: 'EFGH',
      viewViolationReport: 'Sample Link to Violation 2'
    },
    {
      id: '54321',
      status: 'Resolved',
      dateSubmitted: '02/27/24',
      submittedBy: 'Dela Cruz, Juanita (Homeowner)',
      title: 'WSYZ',
      viewViolationReport: 'Sample Link to Violation 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <ListOfReportsClient data={data} />
      </div>
    </div>
  )
}
