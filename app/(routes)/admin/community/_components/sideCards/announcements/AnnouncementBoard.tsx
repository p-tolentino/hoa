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
import {
  Avatar,
  Flex,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { format } from 'date-fns'

export default function AnnouncementBoard () {
  // Get Current Month
  const currentMonthYear = format(new Date(), 'LLLL RRRR')

  const monthCelebrants = [
    {
      name: 'Dan Abrahmov',
      avatar: 'https://bit.ly/dan-abramov',
      profileLink: ''
    },
    {
      name: 'Kent Dodds',
      avatar: 'https://bit.ly/kent-c-dodds',
      profileLink: ''
    },
    {
      name: 'Ryan Florence',
      avatar: 'https://bit.ly/ryan-florence',
      profileLink: ''
    }
  ]

  return (
    <>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>Announcements</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <UnorderedList fontFamily='font.body'>
            <ListItem>
              {/* Homeowner Birthday Celebrants */}
              <Dialog>
                <DialogTrigger asChild>
                  <Link fontSize='sm'>
                    {currentMonthYear} Celebrants{' '}
                    <Text as='span' fontWeight='bold'>
                      (3)
                    </Text>
                  </Link>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>{currentMonthYear} Celebrants</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Stack>
                    {monthCelebrants.map(celebrant => (
                      <Flex align='center' gap='1rem'>
                        <Avatar name={celebrant.name} src={celebrant.avatar} />
                        <Link fontSize='sm' href={celebrant.profileLink}>
                          {celebrant.name}
                        </Link>
                      </Flex>
                    ))}
                  </Stack>
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
                    <DialogTitle>Announcement 1</DialogTitle>
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
                    <DialogTitle>Annoucnement 2</DialogTitle>
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
