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
import { format, isSameMonth, parseISO, getMonth } from 'date-fns'

import { PersonalInfo, User, Events } from '@prisma/client'

interface AnnouncementProps {
  personalInfo: PersonalInfo[]
  events: Events[]
  user: string
}

export default function AnnouncementBoard ({ personalInfo, events, user }: AnnouncementProps) {
  // Get Current Month
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate); // This gets the current month as a zero-based index (0 = January, 11 = December)
  const currentMonthName = format(currentDate, 'LLLL');

  const monthCelebrants = personalInfo.filter((info) => {
    if (!info.birthDay) return false; // Skip if birthday is not defined
    
    // Parse the birthday to a Date object if it's a string, otherwise use it directly
    const birthDate = typeof info.birthDay === 'string' ? new Date(info.birthDay) : info.birthDay;
    
    return getMonth(birthDate) === currentMonth;
  }).map((celebrant) => ({
    name: `${celebrant.firstName} ${celebrant.lastName}`.trim(),
    // Additional properties and adjustments can be made here as needed
  }));

  const currentMonthEvents = events.filter(event => 
    isSameMonth(event.date, currentDate)
  );
  return (
    <>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-lg'>Announcements</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <UnorderedList fontFamily='font.body'>
            <ListItem key={'BirthdayCelebrants'}>
              {/* Homeowner Birthday Celebrants */}
              <Dialog>
                <DialogTrigger asChild>
                  <Link fontSize='sm'>
                    {currentMonthName} Birthday Celebrants{' '}
                    <Text as='span' fontWeight='bold'>
                      ({monthCelebrants.length})
                    </Text>
                  </Link>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>{currentMonthName} Celebrants</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Stack>
                    {monthCelebrants.map((celebrant, index) => (
                      <Flex key={index} align='center' gap='1rem'>
                        {/* <Avatar name={celebrant.name} src={celebrant.avatar} />
                        <Link fontSize='sm' href={celebrant.profileLink}> */}
                          {celebrant.name}
                        {/* </Link> */}
                      </Flex>
                    ))}
                  </Stack>
                </DialogContent>
              </Dialog>
            </ListItem>

{currentMonthEvents.map((event, index) => (
  <ListItem key={event.id}>
    <Dialog>
      {/* Event Title */}
      <DialogTrigger asChild>
        <Link fontSize='sm'>{event.title}</Link>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <Box h='full'>
          <Text as='span' fontSize='xl' fontWeight='bold'>
            {event.title}
          </Text>
          <ScrollArea className='h-[450px] rounded-md'>
            <Stack spacing={3} p={4}>
              <Flex gap={20}>
                <Box>
                  <Text as='span' fontWeight='semibold'>
                    Date:{' '}
                  </Text>
                  <Text as='span'>{format(new Date(event.date), 'MM/dd/yyyy')}</Text> {/* Format the event.date */}
                </Box>
                <Box>
                  <Text as='span' fontWeight='semibold'>
                    Venue:{' '}
                  </Text>
                  <Text as='span'>{event.venue}</Text> {/* Display the event.venue */}
                </Box>
              </Flex>
              <Box pr='2rem'>
                <Text fontWeight='semibold'>Event Description:</Text>
                <Text>
                  {event.description} {/* Display the event.description */}
                </Text>
              </Box>
            </Stack>
          </ScrollArea>
        </Box>
      </DialogContent>
    </Dialog>
  </ListItem>
))}

          </UnorderedList>
        </CardContent>
      </Card>
    </>
  )
}
