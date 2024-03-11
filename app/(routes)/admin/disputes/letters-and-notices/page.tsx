import React from 'react'
import { DisputeLettersAndNoticesClient } from './_components/client'

export default function DisputeLettersAndNotices () {
  const data = [
    {
      id: '12345',
      createdAt: '02/20/24',
      disputeNumber: 'D001',
      disputeType: 'Neighbor-to-Neighbor Conflict',
      viewDisputeLetterNotice: 'Letter'
    },
    {
      id: '67890',
      createdAt: '02/20/24',
      disputeNumber: 'D002',
      disputeType: 'Neighbor-to-Neighbor Conflict',
      viewDisputeLetterNotice: 'Notice'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <DisputeLettersAndNoticesClient data={data} />
      </div>
    </div>
  )
}
