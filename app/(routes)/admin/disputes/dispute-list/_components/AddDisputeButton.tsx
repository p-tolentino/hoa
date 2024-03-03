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
  Button,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default function AddDispute () {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon boxSize={3} mr='10px' />
          Add a Common Dispute
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>Add a Common Dispute</DialogTitle>
            <DialogDescription>Fill up the following fields.</DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                placeholder='Enter a Title'
              />
              <FormHelperText fontFamily='font.body'>
                Input a title for the common dispute.
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Description:
              </FormLabel>
              <Textarea
                placeholder='Write something...'
                id='description'
                fontSize='xs'
                maxH='300px'
              />
              <FormHelperText fontFamily='font.body'>
                Input a description for the common dispute.
              </FormHelperText>
            </FormControl>
          </Stack>

          <DialogFooter>
            <Button size='sm' colorScheme='yellow' type='submit'>
              Add Dispute
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
