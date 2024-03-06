import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'

// Adding a prop type for EventDetails props
interface EventDetailsProps {
  title: string;
  date: string;
  venue: string;
  description: string;
}

export default function EventDetails ({ title, date, venue, description }: EventDetailsProps) {
  return (
    <div className='px-10'>
      <Separator className='mt-8 mb-5' />
      <Box>
        <Text as='span' fontSize='xl' fontWeight='bold'>
          {title}
        </Text>
        <ScrollArea className='h-[120px] rounded-md'>
          <Stack spacing={3} p={4}>
            <Flex gap={20}>
              <Box>
                <Text as='span' fontWeight='semibold'>Date:</Text>
                <Text as='span'>{date}</Text>
              </Box>
              <Box>
                <Text as='span' fontWeight='semibold'>Venue:</Text>
                <Text as='span'>{venue}</Text>
              </Box>
            </Flex>
            <Box pr='2rem'>
              <Text fontWeight='semibold'>Event Description:</Text>
              <Text>{description}</Text>
            </Box>
          </Stack>
        </ScrollArea>
      </Box>
    </div>
  );
}