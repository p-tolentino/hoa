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
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Avatar,
  Box,
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
                  <Link fontSize='sm'>Upcoming Event 1</Link>
                </DialogTrigger>
                <DialogContent className='lg:min-w-[800px]'>
                  <DialogHeader>
                    <DialogTitle>Upcoming Event 1</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Box h='full'>
                    <Text as='span' fontSize='xl' fontWeight='bold'>
                      Event Title
                    </Text>
                    <ScrollArea className='h-[450px] rounded-md'>
                      <Stack spacing={3} p={4}>
                        <Flex gap={20}>
                          <Box>
                            <Text as='span' fontWeight='semibold'>
                              Date:{' '}
                            </Text>
                            <Text as='span'>MM/DD/YYYY</Text>
                          </Box>
                          <Box>
                            <Text as='span' fontWeight='semibold'>
                              Venue:{' '}
                            </Text>
                            <Text as='span'>Lorem ipsum</Text>
                          </Box>
                        </Flex>
                        <Box pr='2rem'>
                          <Text fontWeight='semibold'>Event Description:</Text>
                          <Text>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium atque aliquid harum, quo sapiente
                            nihil cupiditate doloremque reprehenderit iste
                            laboriosam minus voluptatum et. Tenetur, dolorum
                            cupiditate dicta asperiores architecto eveniet
                            magnam provident similique hic sed sequi impedit
                            quisquam error, a incidunt consectetur nihil vitae
                            porro ullam voluptatem ipsum! Natus voluptas, non
                            dignissimos perferendis aspernatur eveniet sapiente
                            minima ea ipsa deserunt iure assumenda architecto
                            quas impedit nostrum? Et inventore nemo, id veniam
                            cum obcaecati autem. Dolor, eius doloribus error
                            repellat non, eligendi voluptatem, repellendus eaque
                            quisquam exercitationem rerum aliquam aperiam?
                            Placeat quaerat cupiditate alias optio laboriosam
                            suscipit voluptatum eligendi nobis saepe.
                          </Text>
                        </Box>
                      </Stack>
                    </ScrollArea>
                  </Box>
                </DialogContent>
              </Dialog>
            </ListItem>
            <ListItem>
              <Dialog>
                {/* Announcement 2 */}
                <DialogTrigger asChild>
                  <Link fontSize='sm'>Upcoming Event 2</Link>
                </DialogTrigger>
                <DialogContent className='lg:min-w-[800px]'>
                  <DialogHeader>
                    <DialogTitle>Upcoming Event 2</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Box h='full'>
                    <Text as='span' fontSize='xl' fontWeight='bold'>
                      Event Title
                    </Text>
                    <ScrollArea className='h-[450px] rounded-md'>
                      <Stack spacing={3} p={4}>
                        <Flex gap={20}>
                          <Box>
                            <Text as='span' fontWeight='semibold'>
                              Date:{' '}
                            </Text>
                            <Text as='span'>MM/DD/YYYY</Text>
                          </Box>
                          <Box>
                            <Text as='span' fontWeight='semibold'>
                              Venue:{' '}
                            </Text>
                            <Text as='span'>Lorem ipsum</Text>
                          </Box>
                        </Flex>
                        <Box pr='2rem'>
                          <Text fontWeight='semibold'>Event Description:</Text>
                          <Text>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Praesentium atque aliquid harum, quo sapiente
                            nihil cupiditate doloremque reprehenderit iste
                            laboriosam minus voluptatum et. Tenetur, dolorum
                            cupiditate dicta asperiores architecto eveniet
                            magnam provident similique hic sed sequi impedit
                            quisquam error, a incidunt consectetur nihil vitae
                            porro ullam voluptatem ipsum! Natus voluptas, non
                            dignissimos perferendis aspernatur eveniet sapiente
                            minima ea ipsa deserunt iure assumenda architecto
                            quas impedit nostrum? Et inventore nemo, id veniam
                            cum obcaecati autem. Dolor, eius doloribus error
                            repellat non, eligendi voluptatem, repellendus eaque
                            quisquam exercitationem rerum aliquam aperiam?
                            Placeat quaerat cupiditate alias optio laboriosam
                            suscipit voluptatum eligendi nobis saepe.
                          </Text>
                        </Box>
                      </Stack>
                    </ScrollArea>
                  </Box>
                </DialogContent>
              </Dialog>
            </ListItem>
          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}
