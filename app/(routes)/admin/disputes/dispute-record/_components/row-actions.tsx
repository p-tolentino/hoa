'use client'

import { Button, FormControl, Text, useToast } from '@chakra-ui/react'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { ListOfDisputesColumn } from './columns'

interface RowActionProps {
  data: ListOfDisputesColumn
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const toast = useToast()

  return (
    <div>
      {/* Status: PENDING = Button: Assign Officer */}
      {data.status === 'Pending' && (
        <form>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm'>Assign Officer-in-Charge</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Assign Officer-in-Charge</DialogTitle>
                <DialogDescription>
                  Assign the officer-in-charge to handle the dispute resolution
                  process for the dispute:
                  <Text mt='1rem'>
                    Submitted by:{' '}
                    <span className='font-semibold'>{data.submittedBy}</span>{' '}
                    <br />
                    Submitted on:{' '}
                    <span className='font-semibold'>{data.dateSubmitted}</span>
                  </Text>
                </DialogDescription>
              </DialogHeader>

              <FormControl isRequired>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an officer-in-charge' />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Grievance and Adjudication Committee */}
                    <SelectGroup>
                      <SelectLabel>
                        Grievance and Adjudication Committee
                      </SelectLabel>
                      <SelectItem value='g&a1'>
                        G&A Committee Member 1
                      </SelectItem>
                      <SelectItem value='g&a2'>
                        G&A Committee Member 2
                      </SelectItem>
                      <SelectItem value='g&a3'>
                        G&A Committee Member 3
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <DialogFooter className='text-right'>
                <FormControl>
                  <Button
                    type='submit'
                    size='sm'
                    colorScheme='yellow'
                    onClick={() =>
                      toast({
                        title: `Successfully assigned an officer-in-charge for the dispute submitted by ${data.submittedBy} on ${data.dateSubmitted}.`,
                        description:
                          'Thank you for offering your services to your homeowners.',
                        status: 'success',
                        position: 'bottom-right',
                        isClosable: true
                      })
                    }
                  >
                    Save changes
                  </Button>
                </FormControl>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      )}

      {/* Status: INPROCESS = Button: Mark as Resolved */}
      {data.status === 'In Process' && (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='sm' colorScheme='green'>
                Mark as Resolved
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Resolve Dispute</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure that the dispute below has been resolved?
                  <Text mt='1rem'>
                    Submitted by:{' '}
                    <span className='font-semibold'>{data.submittedBy}</span>{' '}
                    <br />
                    Submitted on:{' '}
                    <span className='font-semibold'>{data.dateSubmitted}</span>
                  </Text>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-[green]'
                  onClick={() =>
                    toast({
                      title: `Successfully marked the dispute submitted by ${data.submittedBy} on ${data.dateSubmitted} as resolved.`,
                      description:
                        'Thank you for offering your services to your homeowners.',
                      status: 'success',
                      position: 'bottom-right',
                      isClosable: true
                    })
                  }
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}
