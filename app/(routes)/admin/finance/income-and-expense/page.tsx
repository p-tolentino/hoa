import { format } from 'date-fns'

import { TransactionClient } from './_components/client'
import { TransactionColumn } from './_components/columns'
import { currentUser } from '@/lib/auth'
import { getAllUsers } from '@/server/data/user'

const Homeowners = async () => {
  const user = await currentUser()
  if (!user) {
    return null
  }

  const users = await getAllUsers()

  if (!users) {
    return null
  }

  const formattedRecords: TransactionColumn[] = users.map(item => ({
    id: item.id || '',
    dateSubmitted: item.info?.dateSubmitted
      ? format(
          new Date(item.info?.dateSubmitted)?.toISOString().split('T')[0],
          'MMMM dd, yyyy'
        )
      : '',
    dateIssued: item.info?.dateIssued
      ? format(
          new Date(item.info?.dateIssued)?.toISOString().split('T')[0],
          'MMMM dd, yyyy'
        )
      : '',
    type: item.info?.type || '',
    title: item.info?.title || '',
    amount: item.info?.amount || '',
    description: item.info?.description || ''
  }))

  return (
    <div className='flex'>
      <div className='flex-1 space-y-4'>
        <TransactionClient data={formattedRecords} />
      </div>
    </div>
  )
}

export default Homeowners
