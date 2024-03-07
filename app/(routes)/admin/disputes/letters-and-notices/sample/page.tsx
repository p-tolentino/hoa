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

export default function MeetingNotice () {
  const recipient = 'Juan Dela Cruz'
  const dateReceived = 'MM/DD/YYYY'
  const disputeType = 'Neighbor-to-Neighbor Conflict'
  const involvedParties = [
    'Crisostomo Ibarra',
    'Padre Damaso',
    'Padre Salvi',
    'Elias'
  ]
  const dateAndTime = '1 March 2024, 3:00PM'
  const meetingVenue = 'HOA Admin Office'
  const sender = {
    name: 'Maria Clara',
    position: 'HOA President'
  }

  return (
    <div>
      <Box textAlign='right'>
        <Button as={Link} href='/admin/disputes/letters-and-notices'>
          Go Back
        </Button>
      </Box>
      <Center flexDir='column'>
        <Text
          my='10px'
          fontSize='xl'
          fontWeight='bold'
          fontFamily='font.heading'
        >
          Dispute Resolution Meeting Notice 📅
        </Text>
        <Box borderWidth='1px' p={10} borderRadius='md' w='50%'>
          <Stack spacing={5} fontFamily='font.body' fontSize='lg'>
            <Flex justifyContent='space-between'>
              {/* Recipient */}
              <Text>
                Dear <span className='font-bold'>{recipient}</span>,
              </Text>

              {/* Date Received */}
              <Text fontWeight='bold'>{dateReceived}</Text>
            </Flex>

            {/* Dispute Type */}
            <Text textAlign='justify'>
              You are hereby summoned to attend a meeting regarding the ongoing
              dispute: <br />
              <span className='font-bold text-xl'>{disputeType}</span>
            </Text>

            {/* Involved Parties (in 2 columns) */}
            <Text>
              Involved parties: <br />
              <Flex>
                <UnorderedList>
                  {involvedParties
                    .slice(0, Math.ceil(involvedParties.length / 2))
                    .map((person, index) => (
                      <ListItem key={index}>{person}</ListItem>
                    ))}
                </UnorderedList>
                <UnorderedList ml={10}>
                  {involvedParties
                    .slice(Math.ceil(involvedParties.length / 2))
                    .map((person, index) => (
                      <ListItem key={index}>{person}</ListItem>
                    ))}
                </UnorderedList>
              </Flex>
            </Text>

            {/* Meeting Data, Time and Venue */}
            <Text textAlign='justify'>
              The meeting is scheduled for{' '}
              <span className='relative rounded bg-yellow-100 px-2 py-1 font-semibold'>
                {dateAndTime}
              </span>{' '}
              at the{' '}
              <span className='relative rounded bg-yellow-100 px-2 py-1 font-semibold'>
                {meetingVenue}
                {'. '}
              </span>
              Your presence is crucial for resolving this matter.
            </Text>

            <Text textAlign='justify'>
              Details of the dispute and proposed resolutions will be discussed.
              Please come prepared to express your perspective and work towards
              a resolution.
            </Text>
            <Text>Thank you for your cooperation.</Text>
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
      </Center>
    </div>
  )
}
