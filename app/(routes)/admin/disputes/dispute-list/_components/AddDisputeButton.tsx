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
  Textarea
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function AddDispute () {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon boxSize={3} mr='10px' />
          Add Dispute
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>Add a Dispute</DialogTitle>
            <DialogDescription>
              Fill up the following fields to add a dispute in the list of
              disputes.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            {/* Dispute Title */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Dispute Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                placeholder='Enter a Title'
              />
            </FormControl>

            {/* Dispute Description */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Description:
              </FormLabel>
              <Textarea
                placeholder='Write something...'
                fontSize='sm'
                resize='none'
              />
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
