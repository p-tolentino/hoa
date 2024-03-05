import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function EventDetails () {
  return (
    <div className='px-10'>
      <Separator className='mt-8 mb-5' />
      <Box>
        <Text as='span' fontSize='xl' fontWeight='bold'>
          Event Title
        </Text>
        <ScrollArea className='h-[120px] rounded-md'>
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium atque aliquid harum, quo sapiente nihil cupiditate
                doloremque reprehenderit iste laboriosam minus voluptatum et.
                Tenetur, dolorum cupiditate dicta asperiores architecto eveniet
                magnam provident similique hic sed sequi impedit quisquam error,
                a incidunt consectetur nihil vitae porro ullam voluptatem ipsum!
                Natus voluptas, non dignissimos perferendis aspernatur eveniet
                sapiente minima ea ipsa deserunt iure assumenda architecto quas
                impedit nostrum? Et inventore nemo, id veniam cum obcaecati
                autem. Dolor, eius doloribus error repellat non, eligendi
                voluptatem, repellendus eaque quisquam exercitationem rerum
                aliquam aperiam? Placeat quaerat cupiditate alias optio
                laboriosam suscipit voluptatum eligendi nobis saepe.
              </Text>
            </Box>
          </Stack>
        </ScrollArea>
      </Box>
    </div>
  )
}
