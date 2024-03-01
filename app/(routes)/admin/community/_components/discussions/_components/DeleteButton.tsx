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
import { DeleteIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export function DeleteButton () {
  //   const [isDeleteClicked, setIsDeleteClicked] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='sm'
          fontFamily='font.body'
          colorScheme='red'
          leftIcon={<DeleteIcon />}
          // onClick={handleDeletePost}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete your post in the community engagement module, which
            will no longer be available to users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          //   onClick={() => window.location.reload()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
