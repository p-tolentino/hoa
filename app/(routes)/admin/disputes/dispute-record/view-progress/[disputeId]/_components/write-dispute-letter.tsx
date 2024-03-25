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
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { report } from 'process'
import { useState } from 'react'

export default function WriteDisputeLetter ({
  reportDetails
}: {
  reportDetails: any
}) {
  const letterSubjectPlaceholder = `#V${reportDetails.dispute.number
    .toString()
    .padStart(4, '0')} Dispute Letter: ${reportDetails.dispute.type}`

  const [isOpen, setIsOpen] = useState(false) // Dialog open state

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          Write Dispute Letter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Dispute Letter</DialogTitle>
            <DialogDescription>
              Write a letter to the alleged violator(s) informing them that a
              dispute case has been filed against them.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='1.5rem' fontFamily='font.body'>
            <FormControl isReadOnly as={Flex} alignItems='center'>
              <FormLabel>To:</FormLabel>
              <Input
                type='string'
                value={
                  reportDetails.submittedBy
                    ? `${reportDetails.submittedBy.firstName} ${reportDetails.submittedBy.lastName}`
                    : ''
                }
              />
            </FormControl>
            <FormControl isRequired as={Flex} alignItems='center'>
              <FormLabel>Subject:</FormLabel>
              <Input
                type='string'
                placeholder={letterSubjectPlaceholder}
                defaultValue={letterSubjectPlaceholder}
              />
            </FormControl>
            <Textarea
              fontSize='sm'
              fontFamily='font.body'
              placeholder={'Write something...'}
              height='30vh'
              resize='none'
            />
          </Stack>
          <DialogFooter>
            <Button size='sm' colorScheme='yellow' type='submit'>
              Send Dispute Letter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
