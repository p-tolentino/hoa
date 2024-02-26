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

function BusinessPost () {
  const postCategories = [
    { category: 'Food and Drink', color: 'purple.200' },
    { category: 'Clothing ', color: 'red.200' },
    { category: 'Household Items', color: 'blue.200' },
    { category: 'Home Services', color: 'orange.200' }
  ]

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
          Business Title
        </Heading>
        {/* Post Categories */}
        <HStack mb='2%'>
          {postCategories.map(postCategory => (
            <Box
              bg={postCategory.color}
              fontFamily='font.heading'
              fontSize='xs'
              fontWeight='semibold'
              w='15%'
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
            <ButtonGroup size='xs' mt='1rem'>
              <Button colorScheme='yellow' variant='outline'>
                Like
              </Button>
              <Button colorScheme='yellow' variant='outline'>
                Dislike
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
export default BusinessPost
