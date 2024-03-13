'use client'

import { Button, Text, useToast, Box, Input, Flex } from '@chakra-ui/react'
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
import { ListOfDisputesColumn } from './columns'
import SetFeesTable from './set-fees'

interface RowActionProps {
  data: ListOfDisputesColumn
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const toast = useToast()

  return (
    <div>
      {/* Status: PENDING = Button: Take Case */}
      {/* {data.status === "Pending" &&
        user?.info?.committee === "Environment and Security Committee" && (
          <Button
            size="sm"
            _hover={{ textDecoration: "none" }}
            onClick={() => setOfficer(data)}
          >
            Take Case
          </Button>
        )} */}
      {data.status === 'Pending' && (
        <Button
          size='sm'
          colorScheme='gray'
          // onClick={() => setOfficer(data)}
        >
          Take Case
        </Button>
      )}

      {/* Status: UNDERREVIEW = Button: Send Letter */}
      {data.status === 'Under Review' && data.number === 2 && (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='sm' colorScheme='orange'>
                Send Meeting Letter
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Send Meeting Letter</AlertDialogTitle>
                <AlertDialogDescription>
                  Please set the dispute resolution meeting date and time to
                  inform all parties involved.
                </AlertDialogDescription>
              </AlertDialogHeader>

              {/* Meeting Date and Time Input */}
              <Flex gap='1rem' my='1rem'>
                <Input type='date' fontSize='sm' />
                <Input type='time' fontSize='sm' />
              </Flex>

              <AlertDialogFooter>
                <AlertDialogCancel className='mt-0 hover:bg-gray-100'>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className='bg-green-500 hover:bg-green-600'
                  onClick={() =>
                    toast({
                      title: `Successfully sent out ${data.id} dispute resolution meeting letter to all parties involved.`,
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

      {/* Status: UNDERREVIEW = Button: Mark as Resolved */}
      {data.status === 'Under Review' && data.number === 3 && (
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
                    <span className='font-semibold'>{data.createdAt}</span>
                  </Text>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Box mt={2}>
                <SetFeesTable />
              </Box>
              <AlertDialogFooter>
                <AlertDialogCancel className='mt-0 hover:bg-gray-100'>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className='bg-green-500 hover:bg-green-600'
                  onClick={() =>
                    toast({
                      title: `Successfully marked the dispute submitted by ${data.submittedBy} on ${data.createdAt} as resolved.`,
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
