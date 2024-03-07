import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'

// Adding a prop type for EventDetails props
interface EventDetailsProps {
  title: string
  date: string
  venue: string
  description: string
}

export default function EventDetails ({
  title,
  date,
  venue,
  description
}: EventDetailsProps) {
  return (
    <div>
      <Separator className='mt-5 mb-5' />
      <Box>
        <Text as='span' fontSize='lg' fontWeight='bold'>
          {title}
        </Text>
        <ScrollArea className='h-[200px] rounded-md'>
          <Stack spacing={5} p={4}>
            <Flex gap={20}>
              <Box>
                <Text as='span' fontWeight='semibold' mr='5px'>
                  Date:
                </Text>
                <Text as='span' fontFamily='font.body'>
                  {date}
                </Text>
              </Box>
              <Box>
                <Text as='span' fontWeight='semibold' mr='5px'>
                  Venue:
                </Text>
                <Text as='span' fontFamily='font.body'>
                  {venue}
                </Text>
              </Box>
            </Flex>
            <Box pr='2rem'>
              <Text fontWeight='semibold'>Event Description:</Text>
              <Text fontFamily='font.body'>{description}</Text>
            </Box>
          </Stack>
        </ScrollArea>
      </Box>
    </div>
  )
}
