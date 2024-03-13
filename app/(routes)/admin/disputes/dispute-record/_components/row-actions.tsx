'use client'

import { Button, Text, useToast, Box } from '@chakra-ui/react'
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

      {/* Status: REVIEW or AWAITING PAYMENT = Button: Mark as Resolved */}
      {/* // !! ADD CHECKING FOR PROGRESS BEFORE MARKING AS RESOLVED */}

      {/* Status: UNDERREVIEW = Button: Mark as Resolved */}
      {data.status === 'Under Review' && (
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
