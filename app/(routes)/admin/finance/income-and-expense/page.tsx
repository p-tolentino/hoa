import { format } from 'date-fns'

import { TransactionClient } from './_components/client'
import { TransactionColumn } from './_components/columns'
import { currentUser } from '@/lib/auth'
import { getHoaTransactions } from '@/server/data/hoa-transactions'
import {getHoaInfo} from '@/server/data/hoa-info'
import {getUserById} from '@/server/data/user'

const IncomeExpense = async () => {

  const transactions = await getHoaTransactions()
  if (!transactions) {
    return null
  }

  const hoaInfo = await getHoaInfo();
  if (!hoaInfo) {
    return null;
  }

  const formattedRecordsPromise: Promise<TransactionColumn>[] = transactions.map(async (item) => {
    const user = await getUserById(item.userId);

    return {
      id: user?.info?.lastName || '', // Fixed a typo here from lastNamme to lastName
      dateSubmitted: item.createdAt
        ? format(new Date(item.createdAt).toISOString().split('T')[0], 'MMMM dd, yyyy')
        : '',
      dateIssued: item.dateIssued
        ? format(new Date(item.dateIssued).toISOString().split('T')[0], 'MMMM dd, yyyy')
        : '',
      type: item.type || '',
      purpose: item.purpose || '',
      amount: item.amount.toString() || '',
      description: item.description || '',
    };
  });

  const formattedRecords = await Promise.all(formattedRecordsPromise);

  return (
    <div className='flex'>
      <div className='flex-1 space-y-4'>
        <TransactionClient data={formattedRecords} hoaInfo={hoaInfo}/>
      </div>
    </div>
  )
}

export default IncomeExpense
