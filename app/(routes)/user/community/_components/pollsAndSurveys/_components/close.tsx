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
import { LockIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export function Close () {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='sm'
          fontFamily='font.body'
          colorScheme='red'
          leftIcon={<LockIcon />}
        >
          Close
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will close the form and publish the results in the community
            engagement module, which will be available to all users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
