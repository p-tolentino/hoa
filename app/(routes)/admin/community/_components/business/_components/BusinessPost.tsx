'use client'

import {
  Flex,
  Box,
  Text,
  Heading,
  Avatar,
  HStack,
  ButtonGroup,
  Button,
  Spacer
} from '@chakra-ui/react'
import { PiThumbsUpFill } from 'react-icons/pi'
import { formatDistanceToNowStrict } from 'date-fns'
import CommentButton from './_comment/CommentButton'
import { DeleteButton } from './DeleteButton'
import { Post } from "@prisma/client";
import { getPersonalInfo } from "@/server/data/user-info";
import {
  createLike,
  deleteLike,
  getLikeCount,
  checkUserLiked,
} from "@/server/actions/post";
import React, { useEffect, useState } from "react";

interface PostProps {
  posts: Post[];
  user: string;
}

interface UserInfo {
  fullname: string;
  position: string | null;
}

interface UserInfos {
  [userId: string]: UserInfo;
}

const BusinessPost: React.FC<PostProps> = ({ posts, user }) => {
  const categoryColors = {
    MEETING: "purple.200",
    ELECTION: "pink.200",
    INQUIRY: "blue.200",
    EVENT: "orange.200",
    FOODANDDRINK: "purple.200",
    CLOTHING: "pink.200",
    HOUSEHOLDITEMS: "blue.200",
    HOMESERVICES: "orange.200",
    OTHER: "teal.200",
  };

  const [usersInfo, setUsersInfo] = useState<UserInfos>({});
  const [likeCounts, setLikeCounts] = useState<{ [postId: string]: number }>(
    {}
  );
  const [likedByUser, setLikedByUser] = useState<{ [postId: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchUserInfoAndLikes = async () => {
      const userInfoPromises = posts.map((post) =>
        getPersonalInfo(post.userId)
      );
      const likeCountPromises = posts.map((post) => getLikeCount(post.id));
      const likedByUserPromises = posts.map((post) =>
        checkUserLiked(user, post.id)
      );

      try {
        const usersDetails = await Promise.all(userInfoPromises);
        const likesDetails: number[] = await Promise.all(likeCountPromises);
        const likedDetails: boolean[] = await Promise.all(likedByUserPromises);

        const newUsersInfo: UserInfos = {};
        const newLikeCounts: { [postId: string]: number } = {};
        const newLikedByUser: { [postId: string]: boolean } = {};

        usersDetails.forEach((userInfo, index) => {
          if (userInfo) {
            const userId = posts[index].userId;
            newUsersInfo[userId] = {
              fullname: `${userInfo.firstName} ${userInfo.lastName}`,
              position: userInfo.position,
            };
          }
        });

        posts.forEach((post, index) => {
          newLikeCounts[post.id] = likesDetails[index];
          newLikedByUser[post.id] = likedDetails[index];
        });

        setUsersInfo(newUsersInfo);
        setLikeCounts(newLikeCounts);
        setLikedByUser(newLikedByUser);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchUserInfoAndLikes();
  }, [posts, user]);

  const handleLike = async (postId: string) => {
    const currentlyLiked = likedByUser[postId];

    try {
      if (currentlyLiked) {
        // Call your function to delete the like
        await deleteLike(user, postId);
        setLikeCounts((prev) => ({ ...prev, [postId]: prev[postId] - 1 }));
        setLikedByUser((prev) => ({ ...prev, [postId]: false }));
      } else {
        // Call your function to create the like
        await createLike(user, postId);
        setLikeCounts((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1,
        }));
        setLikedByUser((prev) => ({ ...prev, [postId]: true }));
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Optionally, show an error message to the user
    }
  };
  return (
    <>
        {posts.map((post) => (
        <Flex p='10px'>
          <Box
            w='100%'
            h='100%'
            p='20px'
            border='1px'
            borderColor='gray.200'
            borderRadius='10px'
            mb='1%'
          >
            <HStack>
              <Heading size='md' fontFamily='font.heading' mb='1%'>
              {post.title}
              </Heading>
              <Spacer />
              {/* Delete Button */}
              {post.userId === user && <DeleteButton postId={post.id} />}
            </HStack>

            {/* Post Nature of Business */}
            <HStack mb='2%'>
              <Box
                bg={categoryColors[post.category]}
                fontFamily='font.heading'
                fontSize='xs'
                fontWeight='semibold'
                w='wrap'
                p='3px'
                pr='8px'
                pl='8px'
                textAlign='center'
                rounded='md'
              >
               {post.category}
              </Box>
            </HStack>

            {/* Business Post Details */}
            <Flex gap='0.5rem'>
              <Avatar /> {/*default size is medium*/}
              <Box>
                <Text
                  id='name'
                  fontSize='sm'
                  fontWeight='bold'
                  fontFamily='font.body'
                >
                  {usersInfo[post.userId]?.fullname || "Unknown User"}
                </Text>
                <Text
                  id='position'
                  fontSize='sm'
                  fontWeight='bold'
                  fontFamily='font.body'
                >
                  {usersInfo[post.userId]?.position || "No Position Available"}
                </Text>
                <Text
                  id='description'
                  fontSize='sm'
                  py='10px'
                  fontFamily='font.body'
                >
{post.description}
                </Text>
                {/* Date distance */}
                <Text fontFamily='font.body' color='grey' fontSize='xs'>
                Posted {formatDistanceToNowStrict(new Date(post.createdAt))}{" "}
                  ago
                </Text>
                {/* Business Post Actions */}
                <ButtonGroup size='xs' mt='1.5rem'>
                  <Button
                    colorScheme='yellow'
                    variant={likedByUser[post.id] ? "solid" : "outline"}
                    gap='5px'
                    onClick={() => handleLike(post.id)} // Pas
                  >
                    <PiThumbsUpFill /> Like ({likeCounts[post.id] || 0})
                  </Button>
                  <CommentButton post={post.id} user={user}/>
                </ButtonGroup>
              </Box>
            </Flex>
          </Box>
        </Flex>
      ))}
    </>
  )
}
export default BusinessPost;
