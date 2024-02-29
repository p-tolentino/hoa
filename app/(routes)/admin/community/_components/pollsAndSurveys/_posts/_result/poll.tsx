'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Stack, Text, Box, Divider, Progress, Button } from '@chakra-ui/react'

function pollResult () {
  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button
          size='sm'
          fontFamily='font.body'
          colorScheme='green'
          px='1rem'
          m='1rem'
        >
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Poll Report</DialogTitle>
          <DialogDescription>View the report of the poll.</DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <Stack spacing='15px'>
          <Text fontSize='sm' fontWeight='semibold'>
            Poll Title:
          </Text>
          <Text fontSize='sm' fontFamily='font.body'>
            Display Title Here
          </Text>
          <Text fontSize='sm' fontWeight='semibold'>
            Description:
          </Text>
          <Text fontSize='sm' fontFamily='font.body'>
            Display Description Here
          </Text>
          <Divider />

          {/* Poll Result */}
          <Box p='10px'>
            <Stack spacing='15px'>
              <Text fontSize='sm' fontWeight='semibold'>
                Poll Question:
              </Text>
              <Text fontSize='sm' fontFamily='font.body'>
                Display Question Here
              </Text>
              <Stack spacing={2}>
                <Text fontSize='sm' fontFamily='font.body'>
                  Option 1
                </Text>
                <Progress colorScheme='yellow' size='sm' value={20} />
                <Text fontSize='sm' fontFamily='font.body'>
                  Option 2
                </Text>
                <Progress colorScheme='yellow' size='sm' value={80} />
                <Text fontSize='sm' fontFamily='font.body'>
                  Option 3
                </Text>
                <Progress colorScheme='yellow' size='sm' value={60} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
export default pollResult
