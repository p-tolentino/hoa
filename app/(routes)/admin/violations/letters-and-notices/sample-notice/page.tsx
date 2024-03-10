import {
  Box,
  Text,
  Button,
  Center,
  Stack,
  Flex,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import Link from 'next/link'
import { format, addDays } from 'date-fns'

export default function ViolationNotice () {
  const recipient = 'Juan Dela Cruz'
  const dateReceived = format(new Date(2024, 2, 24), 'MMMM dd, yyyy')
  const violationNum = '#V001'
  const violationDate = format(new Date(2024, 2, 8), 'MMMM dd, yyyy')
  const violationType = 'Parking Violation'
  const penaltyFee = '₱ 500'
  const sender = {
    name: 'Maria Clara',
    position: 'Environment and Security Committee Member'
  }
  const withinNumDays: number = 3 // 3 days or 1 day; can be adjusted by admin
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
            {violationNum} Violation Notice 📩
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
                We are writing to bring your attention to an outstanding{' '}
                <span className='font-bold'>penalty fee</span> associated with
                your account.
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
                Please be aware that this violation requires immediate
                attention, and the corresponding fee must be settled within{' '}
                <span className='font-semibold'>
                  {withinNumDays.toLocaleString()}{' '}
                  {withinNumDays === 1 ? 'day' : 'days'}
                </span>{' '}
                from the date of this notice{' '}
                <span className='font-bold text-red-500'>({deadline})</span>.
                Failure to remit payment within this period may result in
                further actions, including additional penalties or legal
                measures.
              </Text>

              <Text textAlign='justify'>
                Kindly refer to your statement of account for the necessary
                details, including the payment amount, due date, and acceptable
                payment methods. If you have any questions or concerns regarding
                the violation or the associated fee, please do not hesitate to
                contact our office.
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
