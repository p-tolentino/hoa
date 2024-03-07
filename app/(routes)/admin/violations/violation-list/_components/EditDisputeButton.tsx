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
import React, { useState } from 'react'
import { EditIcon } from '@chakra-ui/icons'

interface EditDisputeButtonProps {
  title: string
  description: string
}

const EditDisputeButton: React.FC<EditDisputeButtonProps> = ({
  title: initialTitle,
  description: initialDescription
}) => {
  const [description, setDescription] = useState(initialDescription)

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
            <DialogTitle>Edit a Dispute </DialogTitle>
            <DialogDescription>
              You may edit the description of your selected dispute.
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
                value={initialTitle}
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
                fontFamily='font.body'
                maxH='300px'
                value={description}
                onChange={e => setDescription(e.target.value)}
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
export default EditDisputeButton
