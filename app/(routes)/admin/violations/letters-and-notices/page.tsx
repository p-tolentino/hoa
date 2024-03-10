import React from 'react'
import { ViolationLettersAndNoticesClient } from './_components/client'

export default function ViolationLettersAndNotices () {
  const data = [
    {
      id: '12345',
      dateReceived: '03/24/24',
      violationNumber: '1',
      violationType: 'Parking Violation',
      viewViolationLetterNotice: 'View Violation Notice'
    },
    {
      id: '67890',
      dateReceived: '03/10/24',
      violationNumber: '1',
      violationType: 'Parking Violation',
      viewViolationLetterNotice: 'View Violation Letter'
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
