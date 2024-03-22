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

import { Button, Stack, Text, Link } from '@chakra-ui/react'
import { useState } from 'react'

export default function ViewProgressReport ({
  activityTitle
}: {
  activityTitle: string
}) {
  const [isOpen, setIsOpen] = useState(false) // Dialog open state

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Link color='blue.500'>{activityTitle}</Link>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>{activityTitle}</DialogTitle>
            <DialogDescription>Progress Report</DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='1.5rem'>
            <Text>Hello</Text>
          </Stack>
          <DialogFooter></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
