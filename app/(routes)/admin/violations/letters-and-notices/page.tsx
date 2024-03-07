import React from 'react'
import { ViolationLettersAndNoticesClient } from './_components/client'

export default function ViolationLettersAndNotices () {
  const data = [
    {
      id: '12345',
      dateReceived: '02/20/24',
      violationType: 'Parking Violation',
      sender: 'HOA President',
      viewViolationLetterNotice: 'Sample Link to Letter/Notice 1'
    },
    {
      id: '67890',
      dateReceived: '02/20/24',
      violationType: 'Parking Violation',
      sender: 'HOA President',

      viewViolationLetterNotice: 'Sample Link to Letter/Notice 2'
    },
    {
      id: '54321',
      dateReceived: '02/20/24',
      violationType: 'Parking Violation',
      sender: 'HOA President',
      viewViolationLetterNotice: 'Sample Link to Letter/Notice 3'
    }
  ]

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <ViolationLettersAndNoticesClient data={data} />
      </div>
    </div>
  )
}
