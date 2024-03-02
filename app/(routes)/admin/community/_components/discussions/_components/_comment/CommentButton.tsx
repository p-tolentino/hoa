"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Stack,
  Text,
  Box,
  Divider,
  Button,
  Avatar,
  HStack,
  Textarea,
  ButtonGroup,
} from "@chakra-ui/react";
import { PiThumbsUpFill } from "react-icons/pi";
import { formatDistanceToNowStrict } from "date-fns";
import React, { useState, useEffect, FormEvent } from 'react';

import { Comment, PersonalInfo } from "@prisma/client"
import { getPersonalInfo } from "@/server/data/user-info";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createComment, getComments } from "@/server/actions/post";


interface CommentProps {
  post: string;
  user: string
}

interface CombinedComment {
  id: string;
  text: string;
  createdAt: Date;
  user: PersonalInfo | null; // Combine the comment with user's personal info
}

const CommentButton: React.FC<CommentProps> = ({ post, user }) => {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [combinedComments, setCombinedComments] = useState<CombinedComment[]>([]);


  useEffect(() => {
    const fetchCommentsAndUsers = async () => {
      const comments: Comment[] = await getComments(post);
      const commentsWithUserInfoPromises = comments.map(async (comment) => {
        const userInfo = await getPersonalInfo(comment.userId);
        return { ...comment, user: userInfo }; // Combine the comment with the fetched user info
      });
      const combinedComments = await Promise.all(commentsWithUserInfoPromises);
      setCombinedComments(combinedComments);
    };

    fetchCommentsAndUsers();
  }, [post]);
  console.log("the compilation of comments:", comments);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    try {
      await createComment(post, commentText); // Assume createComment is an async operation
      setCommentText(''); // Clear the comment text area
      // Fetch comments again to include the new comment
      const fetchCommentsAndUsers = async () => {
        const fetchedComments: Comment[] = await getComments(post);
        const commentsWithUserInfo = await Promise.all(fetchedComments.map(async (comment) => {
          const userInfo = await getPersonalInfo(comment.userId);
          return { ...comment, user: userInfo }; // Combine the comment with fetched user info
        }));
        setCombinedComments(commentsWithUserInfo);
      };
      fetchCommentsAndUsers();
    } catch (error) {
      console.error("Failed to create comment:", error);
      // Handle error state here, if needed
    }
  };
  
  //const dateDistance = formatDistanceToNowStrict(datePosted);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs" colorScheme="yellow" variant="outline">
          Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Discussion Post Comments</DialogTitle>
          <DialogDescription>Add a comment to the discussion post.</DialogDescription>
        </DialogHeader>

        {/* Example comment list (Replace with actual comments from your application's data) */}
        <Box p="10px" maxH="400px" overflowY="auto">
  {combinedComments.map((combinedComment) => (
    <Box key={combinedComment.id} border="1px" borderColor="gray.200" borderRadius="10px" p="10px">
      <HStack>
        <Avatar /> {/* Ideally, you would fetch and display the user's avatar based on combinedComment.user data */}
        <Stack spacing="0.5px">
          {/* Display user's name if available, otherwise show a placeholder */}
          <Text fontSize="sm" fontWeight="bold">
            {combinedComment.user ? `${combinedComment.user.firstName} ${combinedComment.user.lastName}` : "Unknown User"}
          </Text>
          {/* Display user's position if available, otherwise show a placeholder */}
          <Text fontSize="sm" fontWeight="bold">
            {combinedComment.user ? combinedComment.user.position : "Unknown Position"}
          </Text>
        </Stack>
      </HStack>
      {/* Display the comment content */}
      <Text ml="7.5%" fontSize="sm" p="5px">
        {combinedComment.text}
      </Text>
      {/* Format and display the comment's posting date */}
      <Text ml="8%" color="grey" fontSize="xs">
        Posted {formatDistanceToNowStrict(new Date(combinedComment.createdAt))} ago
      </Text>
    </Box>
  ))}
</Box>

        <Divider />

        {/* Comment submission form */}
        <form onSubmit={onSubmit}>
          <Box border="1px" borderColor="gray.200" borderRadius="10px" p="10px">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write something..."
            />
          </Box>
          <DialogFooter>
            <Button w="full" size="sm" colorScheme="yellow" type="submit">
              Comment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentButton;
