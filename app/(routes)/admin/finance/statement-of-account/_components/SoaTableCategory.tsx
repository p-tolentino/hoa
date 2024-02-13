import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const SoaTableCategory = ({
  data
}: {
  data: {
    status: string
    dateIssued: string
    datePaid: string
    description: string
    amount: string
  }[]
}) => {
  // Calculate the sum of paid and unpaid amounts
  const calculateSums = () => {
    let paidSum = 0
    let unpaidSum = 0
    data.forEach(fee => {
      if (fee.status === 'Paid') {
        paidSum += parseFloat(fee.amount.replace(/,/g, ''))
      } else {
        unpaidSum += parseFloat(fee.amount.replace(/,/g, ''))
      }
    })
    return {
      paidSum,
      unpaidSum
    }
  }

  // Function to format number with commas and two decimal points
  const formatNumber = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  // Get the sums and balance due
  const { paidSum, unpaidSum } = calculateSums()

  // Determine if the balance due is negative
  const isFullyPaid = unpaidSum === 0

  return (
    <div className='border rounded-md mb-3 w-[50vw]'>
      <Table>
        <TableHeader className='bg-[#F0CB5B]'>
          <TableRow>
            <TableHead className='w-[120px]'>Status</TableHead>
            <TableHead className='w-[150px]'>Date Issued</TableHead>
            <TableHead className='w-[150px]'>Date Paid</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((fee, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>
                <Badge
                  className={
                    fee.status === 'Paid' ? 'bg-green-700' : 'bg-red-700'
                  }
                >
                  {fee.status}
                </Badge>
              </TableCell>
              <TableCell className='font-medium'>{fee.dateIssued}</TableCell>
              <TableCell className='font-medium'>{fee.datePaid}</TableCell>
              <TableCell className='font-medium'>{fee.description}</TableCell>
              <TableCell className='font-medium text-right'>
                {fee.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className='font-bold text-lg'>
              Balance Due
            </TableCell>
            <TableCell
              className={`font-bold text-right text-xl ${
                isFullyPaid ? '' : 'text-red-700'
              }`}
            >
              ₱ {formatNumber(parseFloat(unpaidSum.toFixed(2)))}
              {/* Display balance due */}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default SoaTableCategory
