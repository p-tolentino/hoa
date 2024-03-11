'use client'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import DisputeResolution from './_components/DisputeResolution'

export default function DisputeProcess () {
  return (
    <div>
      <Flex justifyContent='space-between'>
        <Heading
          title='Dispute Resolution Process Guide'
          description='Read more about the dispute resolution process. '
        />
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Stack spacing='50px'>
        {/* Dispute Resolution */}
        <Box id='disputeResolution'>
          <DisputeResolution />
        </Box>
      </Stack>
    </div>
  )
}
