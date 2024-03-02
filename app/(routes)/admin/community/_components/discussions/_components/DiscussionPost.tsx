'use client'

import { db } from "@/lib/db";

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
import { Post } from "@prisma/client"
import { PersonalInfo } from "@prisma/client"
import { getUserById } from "@/server/data/user";
import { getPersonalInfo } from "@/server/data/user-info";
import {createLike, getLikeCount, checkUserLiked} from "@/server/actions/post";


import React, { useEffect, useState } from 'react';

interface PostProps {
  posts: Post[];
  user: string
}

interface UserInfo {
  fullname: string;
  position: string | null;
}

interface UserInfos {
  [userId: string]: UserInfo;
}

const DiscussionPost: React.FC<PostProps> = ({ posts, user }) => {

  const categoryColors = {
    MEETING: 'purple.200',
    ELECTION: 'pink.200',
    INQUIRY: 'blue.200',
    EVENT: 'orange.200',
    FOODANDDRINK:'purple.200',
    CLOTHING:'pink.200',
    HOUSEHOLDITEMS:'blue.200',
    HOMESERVICES:'orange.200',
    OTHER: 'teal.200',
  };

  const [usersInfo, setUsersInfo] = useState<UserInfos>({}); // Stores users' data
  const [likeCounts, setLikeCounts] = useState({});
  const [likedByUser, setLikedByUser] = useState({});
  
useEffect(() => {
  const fetchUserInfo = async () => {
    const userInfoPromises = posts.map(async (post) => {
      try {
        // Make sure getPersonalInfo is awaited
        return await getPersonalInfo(post.userId);
      } catch (error) {
        return null; // Return null or a fallback object for errors
      }
    });
    const usersDetails = await Promise.all(userInfoPromises);
    const newUsersInfo: UserInfos = {};
    usersDetails.forEach((userInfo, index) => {
      if (userInfo) { // Check if userInfo is not null
        const userId = posts[index].userId;
        newUsersInfo[userId] = {
          fullname: `${userInfo.firstName} ${userInfo.lastName}`,
          position: userInfo.position,
        };
      }
    });
    // Update state with the fetched and processed user info
    setUsersInfo(newUsersInfo);
  };

  fetchUserInfo();
}, [posts]); // Re-fetch user info when posts change



  const handleLike = async () => {
  }

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

        {/* Post Categories */}
        <HStack mb='2%'>
            <Box
              bg={categoryColors[post.category]}
              fontFamily='font.heading'
              fontSize='xs'
              fontWeight='semibold'
              w='10%'
              p='3px'
              textAlign='center'
              rounded='md'
            >
              {post.category}
            </Box>
        </HStack>

        {/* Discussion Post Details */}
        <Flex gap='0.5rem'>
          <Avatar /> {/*default size is medium*/}
          <Box>
            <Text
              id='name'
              fontSize='xl'
              fontWeight='bold'
              fontFamily='font.body'
            >
              {usersInfo[post.userId]?.fullname || 'Unknown User'}
            </Text>
            <Text
              id='position'
              fontSize='lg'
              fontWeight='bold'
              fontFamily='font.body'
            >
              {usersInfo[post.userId]?.position || 'No Position Available'}
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
              Posted {formatDistanceToNowStrict(new Date(post.createdAt))} ago
            </Text>
            {/* Discussion Post Actions */}
            <ButtonGroup size='xs' mt='1.5rem'>
              <Button
                colorScheme='yellow'
                // variant={liked ? 'solid' : 'outline'}
                gap='5px'
                onClick={handleLike}
              >
                <PiThumbsUpFill /> Like ()
              </Button>
              <CommentButton />
            </ButtonGroup>
          </Box>
        </Flex>
      </Box>
    </Flex>
  ))}
  </>
  )
}
export default DiscussionPost
