import React from 'react'
import { DisputeLettersAndNoticesClient } from './_components/client'

export default function DisputeLettersAndNotices () {
  const data = [
    {
      id: '12345',
      dateReceived: '02/20/24',
      disputeType: 'Neighbor-to-Neighbor Conflict',
      sender: 'HOA President',
      viewDisputeLetterNotice: 'Sample Link to Letter/Notice 1'
    },
    {
      id: '67890',
      dateReceived: '02/20/24',
      disputeType: 'Neighbor-to-Neighbor Conflict',
      sender: 'HOA President',

      viewDisputeLetterNotice: 'Sample Link to Letter/Notice 2'
    },
    {
      id: '54321',
      dateReceived: '02/20/24',
      disputeType: 'Neighbor-to-Neighbor Conflict',
      sender: 'HOA President',
      viewDisputeLetterNotice: 'Sample Link to Letter/Notice 3'
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
