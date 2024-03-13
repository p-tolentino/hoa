import React from 'react'
import { SubmittedDisputesClient } from './_components/client'

export default function SubmittedDisputes () {
  const data = [
    {
      id: '#D001',
      number: 1,
      status: 'Pending',
      createdAt: 'March 01, 2024',
      officerAssigned: 'G&A Officer 1',
      disputeDate: 'MM/DD/YYYY',
      type: 'Neighbor-to-Neighbor Conflict',
      description: '',
      personsInvolved: [''],
      submittedBy: 'Juan Dela Cruz',
      step: 1,
      progress: 'Step 1: Dispute Form Submission'
    },
    {
      id: '#D002',
      number: 2,
      status: 'Under Review',
      createdAt: 'March 01, 2024',
      officerAssigned: 'G&A Officer 2',
      disputeDate: 'MM/DD/YYYY',
      type: 'Neighbor-to-Neighbor Conflict',
      description: '',
      personsInvolved: [''],
      submittedBy: 'Juan Dela Cruz',
      step: 2,
      progress: 'Step 2: Review by Grievance and Adjudication Committee'
    },
    {
      id: '#D003',
      number: 3,
      status: 'Under Review',
      createdAt: 'March 01, 2024',
      officerAssigned: 'G&A Officer 3',
      disputeDate: 'MM/DD/YYYY',
      type: 'Neighbor-to-Neighbor Conflict',
      description: '',
      personsInvolved: [''],
      submittedBy: 'Juan Dela Cruz',
      step: 2,
      progress: 'Step 2: Review by Grievance and Adjudication Committee'
    },
    {
      id: '#D004',
      number: 4,
      status: 'Resolved',
      createdAt: 'March 01, 2024',
      officerAssigned: 'G&A Officer 4',
      disputeDate: 'MM/DD/YYYY',
      type: 'Neighbor-to-Neighbor Conflict',
      description: '',
      personsInvolved: [''],
      submittedBy: 'Juan Dela Cruz',
      step: 3,
      progress: 'Step 3: Dispute Resolution with Corrective Actions'
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
