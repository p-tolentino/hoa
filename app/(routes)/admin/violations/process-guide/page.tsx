'use client'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import ViolationEnforcement from './_components/ViolationEnforcement'
import RectifyViolations from './_components/RectifyViolations'
import PayPenaltyFee from './_components/PayPenaltyFee'

export default function ViolationProcess () {
  return (
    <div>
      <Flex justifyContent='space-between'>
        <Heading
          title='Violation Enforcement Process Guide'
          description='Read more about the violation enforcement process. '
        />
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Stack spacing={10}>
        {/* Violation Enforcement */}
        <Box id='violationEnforcement'>
          <ViolationEnforcement />
        </Box>
        {/* Rectify Violations*/}
        <Box id='rectifyViolations'>
          <RectifyViolations />
        </Box>
        <Box id='payPenaltyFee'>
          <PayPenaltyFee />
        </Box>
      </Stack>
    </div>
  )
}
