import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { deletePost } from "@/server/actions/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteProps {
  postId: string;
}
export function DeleteButton({ postId }: DeleteProps) {
  //   const [isDeleteClicked, setIsDeleteClicked] = useState(false)
  const toast = useToast(); // Initialize toast
  const router = useRouter();
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false); // Step 1: Dialog open state

  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      setIsOpen(false);
      router.refresh();

      // Display success toast
      toast({
        title: "Post Deleted",
        description: "The post has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to delete post:", error);

      // Display error toast
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          fontFamily="font.body"
          colorScheme="red"
          leftIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-justify">
            This will delete your post in the community engagement module, which
            will no longer be available to users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={handleDeletePost}
            //   onClick={() => window.location.reload()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
