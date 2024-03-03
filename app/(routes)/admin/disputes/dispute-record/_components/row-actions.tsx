'use client'

import { Button } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { ListOfComplaintsColumn } from './columns'

interface RowActionProps {
  data: ListOfComplaintsColumn
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  return (
    <div>
      {data.status !== 'Resolved' && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <>
              {/* Status: INPROCESS = Button: Mark as Resolved */}
              {data.status === 'In Process' && (
                <Button size='sm' colorScheme='green'>
                  Mark as Resolved
                </Button>
              )}
              {/* Status: PENDING = Button: Assign Officer */}
              {data.status === 'Pending' && (
                <Button size='sm'>Assign Officer</Button>
              )}
            </>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resolve Complaint</AlertDialogTitle>
              <AlertDialogDescription>
                This action resolves the complaint submitted by the homeowner.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-[green]'>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
