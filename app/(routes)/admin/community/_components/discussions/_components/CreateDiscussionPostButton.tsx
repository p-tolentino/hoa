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
  CheckboxGroup,
  Checkbox,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function CreateDiscussionPostButton () {
  let [postContent, setPostContent] = useState('')

  let handlePostContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputPostContent = e.target.value
    setPostContent(inputPostContent)
  }

  let [isNewCategorySelected, setIsNewCategorySelected] = useState(false)
  let [newCategory, setNewCategory] = useState('')

  let handleCheckboxChange = () => {
    setIsNewCategorySelected(!isNewCategorySelected)
    setNewCategory('') // Clear the input field when toggling the checkbox
  }

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon mr='10px' />
          Create Discussion Post
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>Create Discussion Post</DialogTitle>
            <DialogDescription>
              Fill up the following fields to create a discussion post.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Discussion Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                placeholder='Enter a Discussion Title'
              />
            </FormControl>
            {/* Select Category */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Category:
              </FormLabel>
              <CheckboxGroup size='sm' colorScheme='yellow'>
                <Stack spacing={5} direction='row' fontFamily='font.body'>
                  <Checkbox>Meeting</Checkbox>
                  <Checkbox>Election</Checkbox>
                  <Checkbox>Inquiry</Checkbox>
                  <Checkbox>Event</Checkbox>
                  <Checkbox onChange={handleCheckboxChange}>
                    New Category
                  </Checkbox>
                </Stack>
                {/* New Category selected */}
                {isNewCategorySelected && (
                  <Input
                    size='xs'
                    type='string'
                    placeholder='Enter New Category'
                    p='1rem'
                    mt='0.5rem'
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                  />
                )}
              </CheckboxGroup>
              <FormHelperText fontSize='xs' m='1'>
                Select the categories that apply to your post for members to
                easily find it.
              </FormHelperText>
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
                    placeholder='Write something...'
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
export default CreateDiscussionPostButton
