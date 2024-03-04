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
import { EditIcon } from '@chakra-ui/icons'

export default function EditDispute ({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' mr='5px'>
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>Update a Dispute </DialogTitle>
            <DialogDescription>
              You may update the description of your selected dispute.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            {/* Dispute Title */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                value={title}
                disabled
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
                maxH='300px'
                value={description}
                resize='none'
              />
            </FormControl>
          </Stack>

          <DialogFooter>
            <Button size='sm' colorScheme='yellow' type='submit'>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
