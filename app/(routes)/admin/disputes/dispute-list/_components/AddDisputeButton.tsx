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
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'

export default function AddDispute () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [feesList, setFeesList] = useState([{ name: '', cost: '' }])

  const handleAddFee = () => {
    setFeesList([...feesList, { name: '', cost: '' }])
  }

  const handleRemoveFee = (index: number) => {
    const updatedFeesList = [...feesList]
    updatedFeesList.splice(index, 1)
    setFeesList(updatedFeesList)
  }

  const handleFeeNameChange = (index: number, value: string) => {
    const updatedFeesList = [...feesList]
    updatedFeesList[index].name = value
    setFeesList(updatedFeesList)
  }

  const toast = useToast()

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
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormControl>

            {/* Dispute Description */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Description:
              </FormLabel>
              <Textarea
                fontFamily='font.body'
                placeholder='Write something...'
                fontSize='sm'
                value={description}
                onChange={e => setDescription(e.target.value)}
                resize='none'
              />
            </FormControl>
          </Stack>

          <DialogFooter className='text-right'>
            <FormControl>
              <Button
                size='sm'
                colorScheme='yellow'
                type='submit'
                onClick={() =>
                  toast({
                    title: `Successfully added a dispute type to the list of HOA disputes.`,
                    description: `${title}`,
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true
                  })
                }
              >
                Add Dispute
              </Button>
            </FormControl>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
