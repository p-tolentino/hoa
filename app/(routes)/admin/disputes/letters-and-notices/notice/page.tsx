'use client'

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
import { format, addDays, subDays } from 'date-fns'

export default function DisputeMeetingNotice () {
  const meetingDetails = {
    date: format(addDays(new Date(2023, 2, 1), 10), 'MMMM dd, yyyy'),
    time: '3:00PM',
    venue: 'HOA Admin Office'
  }
  const sender = {
    name: 'Maria Clara',
    committee: 'Grievance and Adjudication Committee',
    contact: '090X XXX XXXX'
  }

  const disputeNum = '#D001'
  const recipient = 'Juan Dela Cruz'
  const dateReceived = format(subDays(meetingDetails.date, 1), 'MMMM dd, yyyy')
  const disputeDate = format(new Date(2023, 2, 1), 'MMMM dd, yyyy')
  const disputeType = 'Neighbor-to-Neighbor Conflict'
  const personsInvolved = [
    'Crisostomo Ibarra',
    'Padre Damaso',
    'Padre Salvi',
    'Elias'
  ]
  const violation = {
    type: 'Parking',
    penaltyFee: '₱ 500'
  }

  return (
    <div>
      <Box textAlign='right'>
        <Button as={Link} href='/admin/disputes/letters-and-notices' size='sm'>
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
            {disputeNum} Dispute Resolution Meeting Notice 📅
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
                We are writing to inform you that you are hereby summoned to
                attend a meeting scheduled to address and deliberate on the
                resolution of an ongoing{' '}
                <span className='font-bold'>dispute</span>.
              </Text>

              {/* Dispute Details */}
              <Box>
                <Text>Dispute Details:</Text>
                <Flex gap='50px'>
                  <UnorderedList ml={7}>
                    {/* Date of Dispute */}
                    <ListItem>
                      Date of Dispute:{' '}
                      <span className='font-semibold'>{disputeDate}</span>
                    </ListItem>
                    {/* Dispute Type */}
                    <ListItem>
                      Dispute Type:{' '}
                      <span className='font-semibold'>{disputeType}</span>
                    </ListItem>
                    {/* Involved Person/s */}
                    <ListItem>
                      <>
                        Person/s Involved:{' '}
                        <UnorderedList ml={7}>
                          {personsInvolved.map((person, index) => (
                            <ListItem
                              key={'Person' + index}
                              fontWeight='semibold'
                            >
                              {person}
                            </ListItem>
                          ))}
                        </UnorderedList>
                      </>
                    </ListItem>
                  </UnorderedList>
                  {/* Violation */}
                  <UnorderedList>
                    <ListItem>
                      <>
                        Violation:{' '}
                        {violation === null ? (
                          <span className='font-semibold'>N/A</span>
                        ) : (
                          <UnorderedList>
                            <ListItem>
                              Type:{' '}
                              <span className='font-semibold'>
                                {violation.type}
                              </span>
                            </ListItem>
                            <ListItem>
                              Penalty Fee:{' '}
                              <span className='text-red-500 font-semibold'>
                                {violation.penaltyFee}
                              </span>
                            </ListItem>
                          </UnorderedList>
                        )}
                      </>
                    </ListItem>
                  </UnorderedList>
                </Flex>
              </Box>

              {/* Meeting Details */}
              <Box>
                <Text textAlign='justify'>
                  The meeting has been scheduled for {/* Meeting Time */}
                  <span className='font-bold text-red-500'>
                    {meetingDetails.date}, {meetingDetails.time}
                  </span>{' '}
                  at the {/* Meeting Venue */}
                  <span className='font-bold text-red-500'>
                    {meetingDetails.venue}
                    {'. '}
                  </span>{' '}
                  Please inform us if you are available on the said date by
                  contacting me at{' '}
                  <span className='font-semibold'>{sender.contact}</span>
                  {'. '}
                  <span className='text-gray-500'>
                    (You may check the{' '}
                    <Link
                      href='/admin/membership/admin-directory'
                      className='hover:underline text-blue-500'
                    >
                      Admin & Officers Directory
                    </Link>{' '}
                    in the Membership module for your reference)
                  </span>
                  .
                </Text>
              </Box>

              <Text textAlign='justify'>
                Your presence is crucial for resolving this matter and
                maintaining a positive relationship with our organization.
                Details of the dispute and proposed resolutions will be
                discussed. Please come prepared to express your perspective and
                work towards a resolution.
              </Text>

              <Text textAlign='justify'>
                Please refer to the{' '}
                <Link
                  href='/admin/disputes/process-guide'
                  className='hover:underline text-blue-500'
                >
                  Dispute Resolution Process Guide
                </Link>{' '}
                for further information on the overall process of resolving this
                dispute.
              </Text>

              <Text>Thank you for your cooperation.</Text>

              <Text textAlign='justify' mt={5}>
                Sincerely,
              </Text>
              {/* Sender's Name and Position */}
              <Box>
                <Text>{sender.name}</Text>
                <Text color='grey'>{sender.committee}</Text>
              </Box>
            </Stack>
          </Box>
        </>
      </Center>
    </div>
  )
}
