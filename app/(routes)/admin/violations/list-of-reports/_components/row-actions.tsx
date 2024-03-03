'use client'

import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
import { ListOfReportsColumn } from './columns'

interface RowActionProps {
  data: ListOfReportsColumn
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  return (
    <div>
      {/* Status: PENDING = Button: Assign Officer */}
      {data.status === 'Pending' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm'>Assign Officer-in-Charge</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Assign Officer-in-Charge</DialogTitle>
              <DialogDescription>
                Assign the officer-in-charge for handling this violation report.
              </DialogDescription>
            </DialogHeader>
            <form>
              <FormControl isRequired>
                <Input
                  type='string'
                  size='sm'
                  placeholder="Enter an officer's name..."
                />
              </FormControl>
            </form>
            <DialogFooter>
              <Button type='submit' size='sm' colorScheme='yellow'>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Status: INPROCESS = Button: Mark as Resolved */}
      {data.status === 'In Process' && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='sm' colorScheme='green'>
              Mark as Resolved
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resolve Violation Report</AlertDialogTitle>
              <AlertDialogDescription>
                This action resolves the violation report submitted by the
                homeowner.
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
