'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react'

export default function AnnouncementBoard () {
  return (
    <>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>Announcement Board</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <UnorderedList fontFamily='font.body'>
            <ListItem>
              {/* Homeowner Birthday Celebrants */}
              <Dialog>
                <DialogTrigger asChild>
                  <Link fontSize='sm'>Homeowner Birthday Celebrants (1)</Link>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Send Birthday Greetings</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </ListItem>
            <ListItem>
              <Dialog>
                {/* Announcement 1 */}
                <DialogTrigger asChild>
                  <Link fontSize='sm'>Announcement 1</Link>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Send Birthday Greetings</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </ListItem>
            <ListItem>
              <Dialog>
                {/* Announcement 2 */}
                <DialogTrigger asChild>
                  <Link fontSize='sm'>Announcement 2</Link>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Send Birthday Greetings</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}
