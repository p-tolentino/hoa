'use client'

import { Button, FormControl, Text, useToast, Box } from '@chakra-ui/react'
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

import { ListOfViolationsColumn } from './columns'
import SetFeesTable from './penalty'
import Penalty from './penalty'

interface RowActionProps {
  data: ListOfViolationsColumn
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
                  Assign the officer-in-charge to handle the violation process:
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
                    {/* Environment and Security Committee */}
                    <SelectGroup>
                      <SelectLabel>
                        Environment and Security Committee
                      </SelectLabel>
                      <SelectItem value='g&a1'>
                        E&S Committee Member 1
                      </SelectItem>
                      <SelectItem value='g&a2'>
                        E&S Committee Member 2
                      </SelectItem>
                      <SelectItem value='g&a3'>
                        E&S Committee Member 3
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
                        title: `Successfully assigned an officer-in-charge for the violation submitted by ${data.submittedBy} on ${data.dateSubmitted}.`,
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
                <AlertDialogTitle>Resolve Violation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure that the violation below has been resolved?
                  <Text mt='1rem'>
                    Submitted by:{' '}
                    <span className='font-semibold'>{data.submittedBy}</span>{' '}
                    <br />
                    Submitted on:{' '}
                    <span className='font-semibold'>{data.dateSubmitted}</span>
                  </Text>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Box mt={2}>
                <Penalty />
              </Box>
              <AlertDialogFooter>
                <AlertDialogCancel className='mt-0 hover:bg-gray-100'>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className='bg-green-500 hover:bg-green-600'
                  onClick={() =>
                    toast({
                      title: `Successfully marked the violation submitted by ${data.submittedBy} on ${data.dateSubmitted} as resolved.`,
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
