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
import { deletePost } from "@/server/actions/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react'

interface DeleteProps {
  postId: string
}
export function DeleteButton ({postId}:DeleteProps) {
  //   const [isDeleteClicked, setIsDeleteClicked] = useState(false)
  const router = useRouter();
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false); // Step 1: Dialog open state

  const handleDeletePost = async () => {
    try {
      await deletePost(postId); // Assume createPost is an async operation
      setIsOpen(false); // Close dialog upon success
      router.refresh(); // Refresh the page or navigate as needed
    } catch (error) {
      console.error("Failed to delete post:", error);
      // Handle error state here, if needed
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='sm'
          fontFamily='font.body'
          colorScheme='red'
          leftIcon={<DeleteIcon />}
          onClick={handleDeletePost}
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
