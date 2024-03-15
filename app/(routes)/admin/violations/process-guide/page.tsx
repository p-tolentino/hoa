import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import ViolationEnforcement from './_components/ViolationEnforcement'
import RectifyViolations from './_components/RectifyViolations'
import PayPenaltyFee from './_components/PayPenaltyFee'
import { getHoaInfo } from '@/server/data/hoa-info'
import Link from 'next/link'

export default async function ViolationProcess () {
  const hoa = await getHoaInfo()

  if (!hoa) {
    return null
  }

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Heading
          title='Violation Enforcement Process Guide'
          description='Read more about the violation enforcement process. '
        />
        <Button as={Link} href='/admin/violations' size='sm'>
          Go Back
        </Button>
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Stack spacing='50px'>
        {/* Violation Enforcement */}
        <Box id='violationEnforcement'>
          <ViolationEnforcement hoa={hoa} />
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
