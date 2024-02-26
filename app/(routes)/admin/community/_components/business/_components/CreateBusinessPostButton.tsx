'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Input,
  Stack,
  Text,
  Box,
  HStack,
  Divider,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function CreateBusinessPostButton () {
  let [postContent, setPostContent] = useState('')

  let handlePostContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputPostContent = e.target.value
    setPostContent(inputPostContent)
  }

  const [nature, setNature] = useState('')

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon mr='10px' />
          Create Business Post
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>Create Business Post</DialogTitle>
            <DialogDescription>
              Fill up the following fields to create a business post.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Business Name:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                // placeholder='Enter the name of your business'
              />
            </FormControl>
            {/* Select Nature */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Nature of Business:
              </FormLabel>
              <RadioGroup
                size='sm'
                colorScheme='yellow'
                onChange={setNature}
                value={nature}
              >
                <Stack spacing={5} direction='row' fontFamily='font.body'>
                  <Radio value='foodAndDrink'>Food And Drink</Radio>
                  <Radio value='clothing'>Clothing</Radio>
                  <Radio value='householdItems'>Household Items</Radio>
                  <Radio value='homeServices'>Home Services</Radio>
                  <Radio value='other'>Other</Radio>
                </Stack>

                {/* New Nature selected */}
                {nature === 'other' && (
                  <Input
                    size='xs'
                    type='string'
                    placeholder='Enter Nature of Business'
                    p='1rem'
                    mt='0.5rem'
                  />
                )}
              </RadioGroup>
            </FormControl>
            <Divider />
            <Box py='10px'>
              <Stack spacing='15px'>
                {/* Post Content */}
                <FormControl isRequired>
                  <FormLabel fontSize='sm' fontWeight='semibold'>
                    Your Post
                  </FormLabel>
                  <Textarea
                    placeholder='Promote your business...'
                    id='discussionPost'
                    fontSize='xs'
                    maxH='300px'
                    value={postContent}
                    onChange={handlePostContentChange}
                  />
                </FormControl>
                {/* Attach Files */}
                <Box>
                  <Text fontSize='xs' mb='3px'>
                    Attach files (Maximum of 2)
                  </Text>
                  <HStack gap='1rem'>
                    <Input type='file' size='xs' />
                    <Input type='file' size='xs' />
                  </HStack>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <DialogFooter>
            <Button
              size='sm'
              colorScheme='yellow'
              type='submit'
              // onClick={() => onSubmit()}
            >
              Submit Post for Approval
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateBusinessPostButton
