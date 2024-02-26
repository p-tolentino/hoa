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
  Spacer,
  Divider,
  CheckboxGroup,
  Checkbox,
  Button
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function createSurveys () {
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
          Create Survey
        </Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Create a Survey</DialogTitle>
          <DialogDescription>
            Fill up the following survey details.
          </DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <Stack spacing='15px'>
          <Text fontSize='sm' fontWeight='semibold'>
            Survey Title:
          </Text>
          <Input
            size='md'
            fontWeight='semibold'
            type='string'
            placeholder='Enter a Survey Title'
          />
          <Text fontSize='sm' fontWeight='semibold'>
            Description:
          </Text>
          <Input size='sm' type='string' placeholder='Enter a Description' />

          {/* Select Category */}
          <Text fontSize='sm' fontWeight='semibold'>
            Category:
          </Text>
          <CheckboxGroup size='sm' colorScheme='yellow'>
            <Stack spacing={5} direction='row' fontFamily='font.body'>
              <Checkbox>Meeting</Checkbox>
              <Checkbox>Election</Checkbox>
              <Checkbox>Inquiry</Checkbox>
              <Checkbox>Event</Checkbox>
              <Checkbox onChange={handleCheckboxChange}>Other</Checkbox>
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
          <Divider />
          {/* Survey Question */}
          <Box p='10px'>
            <Stack spacing='15px'>
              <HStack>
                <Text fontSize='sm' fontWeight='semibold'>
                  Survey Question:
                </Text>
                <Spacer />
                <Box alignSelf='center' ml='2%'>
                  <Button size='xs' colorScheme='yellow'>
                    Add Question
                  </Button>
                </Box>
              </HStack>
              <Input
                size='sm'
                type='string'
                placeholder='Enter a Survey Question'
              />
              <Text fontSize='sm' fontWeight='semibold'>
                Options:
              </Text>
              <HStack>
                <Input size='sm' type='string' placeholder='Option 1' />
                <Box alignSelf='center' ml='2%'>
                  <Button size='xs' w='20px'>
                    <AddIcon />
                  </Button>
                </Box>
              </HStack>
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
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default createSurveys
