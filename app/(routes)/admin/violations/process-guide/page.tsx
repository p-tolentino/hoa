import { Box, Flex, Stack } from '@chakra-ui/react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import ViolationEnforcement from './_components/ViolationEnforcement'
import AppealViolations from './_components/AppealViolations'
import PayPenaltyFee from './_components/PayPenaltyFee'
import { getHoaInfo } from '@/server/data/hoa-info'
import BackButton from '@/components/system/BackButton'

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
        <BackButton />
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Stack spacing='50px'>
        {/* Violation Enforcement */}
        <Box id='violationEnforcement'>
          <ViolationEnforcement hoa={hoa} />
        </Box>
        {/* Appeal Violations */}
        <Box id='appealViolations'>
          <AppealViolations />
        </Box>
        <Box id='payPenaltyFee'>
          <PayPenaltyFee />
        </Box>
      </Stack>
    </div>
  )
}
