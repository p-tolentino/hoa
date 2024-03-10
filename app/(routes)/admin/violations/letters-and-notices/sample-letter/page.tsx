import {
  Box,
  Text,
  Button,
  Center,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
  OrderedList
} from '@chakra-ui/react'
import Link from 'next/link'
import { format, addDays } from 'date-fns'

export default function ViolationLetter () {
  const recipient = 'Juan Dela Cruz'
  const dateReceived = format(new Date(2024, 2, 10), 'MMMM dd, yyyy')
  const violationNum = '#V001'
  const violationDate = format(new Date(2024, 2, 8), 'MMMM dd, yyyy')
  const violationType = 'Parking Violation'
  const penaltyFee = '₱ 500'
  const sender = {
    name: 'Maria Clara',
    position: 'Environment and Security Committee Member'
  }
  const withinNumDays: number = 14 // cam be adjusted ny admin
  const deadline = format(addDays(dateReceived, withinNumDays), 'MMMM dd, yyyy')

  return (
    <div>
      <Box textAlign='right'>
        <Button
          as={Link}
          href='/admin/violations/letters-and-notices'
          size='sm'
        >
          Go Back
        </Button>
      </Box>
      <Center flexDir='column'>
        <>
          <Text
            my='10px'
            fontSize='xl'
            fontWeight='bold'
            fontFamily='font.heading'
          >
            {violationNum} Violation Letter 📩
          </Text>
          <Box borderWidth='1px' p={10} borderRadius='md' w='60vw'>
            <Stack spacing={5} fontFamily='font.body' fontSize='md'>
              <Flex justifyContent='space-between'>
                {/* Recipient */}
                <Text>
                  Dear <span className='font-bold'>{recipient}</span>,
                </Text>
                {/* Date Received */}
                <Text fontWeight='bold'>{dateReceived}</Text>
              </Flex>

              <Text textAlign='justify'>
                We are writing to inform you that a{' '}
                <span className='font-bold'>violation</span> has been reported
                against you.
              </Text>

              {/* Violation Details */}
              <Box>
                <Text textAlign='justify'>
                  Violation Details: <br />
                </Text>
                <UnorderedList>
                  {/* Date of Violation */}
                  <ListItem>
                    Date of Violation:{' '}
                    <span className='font-semibold'>{violationDate}</span>
                  </ListItem>
                  {/* Violation Type */}
                  <ListItem>
                    Violation Type:{' '}
                    <span className='font-semibold'>{violationType}</span>
                  </ListItem>
                  {/* Penalty Fee */}
                  <ListItem>
                    Penalty Fee:{' '}
                    <span className='font-semibold text-red-500'>
                      {penaltyFee}
                    </span>
                  </ListItem>
                </UnorderedList>
              </Box>

              <Text textAlign='justify'>
                Upon investigation, it has been determined that corrective
                actions are required to address the violation. You have two (2)
                options for resolution:
              </Text>

              <OrderedList spacing={3}>
                <ListItem>
                  <span className='font-bold'>Payment of Penalty Fee</span>: You
                  may choose to resolve the violation by paying the associated
                  penalty fee. Payment instructions can be found in the{' '}
                  <Link
                    href='/admin/violations/process-guide#payPenaltyFee'
                    className='hover:underline text-blue-500'
                  >
                    Violation Process Guide - Pay Penalty Fee{' '}
                  </Link>
                  section.
                </ListItem>
                <ListItem>
                  <span className='font-bold'>Appeal the Violation</span>: If
                  you would like to appeal the decision, you have the right to
                  do so. To initiate the appeal process, please follow the
                  instructinons of rectifying a violation report in the{' '}
                  <Link
                    href='/admin/violations/process-guide#rectifyViolations'
                    className='hover:underline text-blue-500'
                  >
                    Violation Process Guide - Rectify Violations{' '}
                  </Link>
                  section.
                </ListItem>
              </OrderedList>

              <Text textAlign='justify'>
                Please take immediate action to rectify the violation within{' '}
                <span className='font-semibold'>
                  {withinNumDays.toLocaleString()} days
                </span>{' '}
                from the date of this notice{' '}
                <span className='font-bold text-red-500'>({deadline})</span>.
              </Text>

              <Text textAlign='justify'>
                Your prompt attention to this matter is crucial in maintaining a
                positive relationship with our organization and avoiding any
                potential consequences. We appreciate your cooperation in
                resolving this issue promptly.
              </Text>

              <Text textAlign='justify' mt={5}>
                Sincerely,
              </Text>
              {/* Sender's Name and Position */}
              <Box>
                <Text>{sender.name}</Text>
                <Text color='grey'>{sender.position}</Text>
              </Box>
            </Stack>
          </Box>
        </>
      </Center>
    </div>
  )
}
