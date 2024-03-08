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
  const disputeDate = 'March 01, 2024'
  const disputeType = 'Neighbor-to-Neighbor Conflict'
  const personsInvolved = formatInvolvedPersons([
    'Crisostomo Ibpersonsa',
    'Padre Damaso',
    'Padre Salvi',
    'Elias'
  ])
  const meetingDetails = {
    date: '1 March 2024',
    time: '3:00PM',
    venue: 'HOA Admin Office'
  }
  const sender = {
    name: 'Maria Clara',
    position: 'HOA President'
  }

  function formatInvolvedPersons (persons: string[]) {
    if (persons.length === 0) {
      return ''
    } else if (persons.length === 1) {
      return persons[0]
    } else {
      const lastItem = persons.pop()
      return `${persons.join(', ')} and ${lastItem}`
    }
  }

  return (
    <div>
      <Box textAlign='right'>
        <Button as={Link} href='/admin/disputes/letters-and-notices'>
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
              <Text textAlign='justify'>
                You are hereby summoned to attend a meeting scheduled to address
                and deliberate on the resolution of an ongoing{' '}
                <span className='font-bold'>dispute</span>.
              </Text>

              <Box>
                <Text>Dispute Details:</Text>
                <UnorderedList>
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
                    Person/s Involved:{' '}
                    <span className='font-semibold'>{personsInvolved}</span>
                  </ListItem>
                </UnorderedList>
              </Box>

              {/* Meeting Date, Time and Venue */}
              <Text textAlign='justify'>
                The meeting is scheduled for{' '}
                <span className='relative rounded bg-yellow-100 px-2 py-1 font-semibold'>
                  {meetingDetails.date}, {meetingDetails.time}
                </span>{' '}
                at the{' '}
                <span className='relative rounded bg-yellow-100 px-2 py-1 font-semibold'>
                  {meetingDetails.venue}
                  {'. '}
                </span>
                Your presence is crucial for resolving this matter.
              </Text>
              <Text textAlign='justify'>
                Details of the dispute and proposed resolutions will be
                discussed. Please come prepared to express your perspective and
                work towards a resolution.
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
        </>
      </Center>
    </div>
  )
}
