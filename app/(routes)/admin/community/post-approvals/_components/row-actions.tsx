import React from 'react';
import { Button, Flex, useToast } from "@chakra-ui/react";
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
import { PendingPostColumn } from './columns'; // Assuming this is the correct import path
import { updatePostStatus } from "@/server/actions/post";
import { useRouter } from "next/navigation";

interface RowActionProps {
  data: PendingPostColumn;
}

const RowActions: React.FC<RowActionProps> = ({ data }) => {
  // Example usage of data within the component. Adjust according to your needs.
  const toast = useToast(); // Using Chakra UI's useToast for feedback
  const router = useRouter();
  const handleApprove = async () => {
    try {
      const response = await updatePostStatus(data.id); // Assuming updatePostStatus now also takes a status argument
      if(response.error) {
        toast({
          title: 'Error',
          description: response.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Post Approved',
          description: 'The post has been successfully approved.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.refresh();
        // Optionally, refresh the data or navigate as needed
      }
    } catch (error) {
      console.error('Failed to approve post:', error);
      // Handle error appropriately
    }
  };
 return (
  <Flex gap={2}>
  {/* Approve Button */}
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button size="sm" colorScheme="green">
        Approve
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Approve Request to Post</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        Are you sure you want to approve the post submitted by {data.submittedBy}? This action allows the post to reflect in the Community Engagement module.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-green-500" onClick={handleApprove}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  {/* Decline Button and other parts of the component remain unchanged */}
      {/* Decline Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" colorScheme="red">
            Decline
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Request to Post</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to decline the post submitted by on  This action will delete this post from the list of pending posts and will not appear in the Community Engagement module.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default RowActions;