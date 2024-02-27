'use client'

import {
  Flex,
  Box,
  Text,
  Heading,
  Avatar,
  HStack,
  ButtonGroup,
  Button
} from '@chakra-ui/react'
import { PiThumbsUpFill, PiThumbsDownFill } from 'react-icons/pi'
import { formatDistanceToNowStrict } from 'date-fns'
import { useState } from 'react'

function DiscussionPost () {
  const postCategories = [
    { category: 'Meeting', color: 'purple.200' },
    { category: 'Election', color: 'red.200' },
    { category: 'Inquiry', color: 'blue.200' },
    { category: 'Event', color: 'orange.200' },
    { category: 'New Category', color: 'pink.200' }
  ]

  const datePosted = new Date(2024, 2, 1)
  const dateDistance = formatDistanceToNowStrict(datePosted)

  const [likeCount, setLikeCount] = useState(0)
  const [dislikeCount, setDislikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1)
      if (disliked) {
        setDislikeCount(dislikeCount - 1)
        setDisliked(false)
      }
    } else {
      setLikeCount(likeCount - 1)
    }
    setLiked(!liked)
  }

  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(dislikeCount + 1)
      if (liked) {
        setLikeCount(likeCount - 1)
        setLiked(false)
      }
    } else {
      setDislikeCount(dislikeCount - 1)
    }
    setDisliked(!disliked)
  }

  return (
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
        <Heading size='md' fontFamily='font.heading' mb='1%'>
          Discussion Title
        </Heading>
        {/* Post Categories */}
        <HStack mb='2%'>
          {postCategories.map((postCategory, index) => (
            <Box
              key={index}
              bg={postCategory.color}
              fontFamily='font.heading'
              fontSize='xs'
              fontWeight='semibold'
              w='12%'
              p='3px'
              textAlign='center'
              rounded='md'
            >
              {postCategory.category}
            </Box>
          ))}
        </HStack>

        {/* Discussion Post Details */}
        <Flex gap='0.5rem'>
          <Avatar /> {/*default size is medium*/}
          <Box>
            <Text
              id='name'
              fontSize='sm'
              fontWeight='bold'
              fontFamily='font.body'
            >
              Name
            </Text>
            <Text
              id='position'
              fontSize='sm'
              fontWeight='bold'
              fontFamily='font.body'
            >
              Position (Homeowner or Officer)
            </Text>
            <Text
              id='description'
              fontSize='sm'
              py='10px'
              fontFamily='font.body'
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              ratione quia! Hic atque nostrum tempore consectetur dolores
              mollitia corporis aliquam labore eligendi, possimus sequi quidem
              fuga commodi dolorum nemo non magni earum consequuntur quod
              aliquid repellendus ad? Reprehenderit beatae praesentium eaque,
              quis fugit dignissimos, inventore omnis eveniet alias nemo quasi.
            </Text>
            {/* Date distance */}
            <Text fontFamily='font.body' color='grey' fontSize='xs'>
              Posted {dateDistance} ago
            </Text>
            {/* Discussion Post Actions */}
            <ButtonGroup size='xs' mt='1.5rem'>
              <Button
                colorScheme='yellow'
                variant={liked ? 'solid' : 'outline'}
                gap='5px'
                onClick={handleLike}
              >
                <PiThumbsUpFill /> Like ({likeCount})
              </Button>
              <Button
                colorScheme='yellow'
                variant={disliked ? 'solid' : 'outline'}
                gap='5px'
                onClick={handleDislike}
              >
                <PiThumbsDownFill />
                Dislike ({dislikeCount})
              </Button>
              <Button colorScheme='yellow' variant='outline'>
                Comment
              </Button>
            </ButtonGroup>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
export default DiscussionPost
