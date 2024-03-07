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
import { Button, useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons' // Import the DeleteIcon

interface DeleteDisputeButtonProps {
  dispute: {
    title: string
    description: string
  }
  continueDeletion: (confirmed: boolean) => void
}

const DeleteDisputeButton: React.FC<DeleteDisputeButtonProps> = ({
  dispute,
  continueDeletion
}) => {
  const toast = useToast()

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button key={dispute.title} size='sm' mr='10px' colorScheme='red'>
            <DeleteIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Dispute Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure that you want to delete the dispute type: <br />
              <span className='font-semibold'>{dispute.title}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className='mt-0 hover:bg-gray-100'
              onClick={() => continueDeletion(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-500 hover:bg-red-600'
              onClick={() => {
                continueDeletion(true)
                toast({
                  title: `Successfully deleted dispute type: `,
                  description: `${dispute.title}`,
                  status: 'success',
                  position: 'bottom-right',
                  isClosable: true,
                  colorScheme: 'red'
                })
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteDisputeButton
