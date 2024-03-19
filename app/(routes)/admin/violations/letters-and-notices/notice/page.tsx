'use client'

import {
  Box,
  Text,
  Center,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
  Spinner
} from '@chakra-ui/react'
import { format, addDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { getNoticeById } from '@/server/data/letter-notice'
import { Notice, PersonalInfo, Violation, ViolationType } from '@prisma/client'
import { getInfoById } from '@/server/data/user-info'
import { getViolationTypeByName } from '@/server/data/violation-type'
import { getViolationById } from '@/server/data/violation'
import BackButton from '@/components/system/BackButton'

export default function ViolationNotice () {
  const searchParams = useSearchParams()

  const [notice, setNotice] = useState<Notice | null>()
  const [recipient, setRecipient] = useState<PersonalInfo | null>()
  const [sender, setSender] = useState<PersonalInfo | null>()
  const [violation, setViolation] = useState<Violation | null>()
  const [violationType, setViolationType] = useState<ViolationType | null>()

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        const noticeId = searchParams.get('noticeId')
        const violationId = searchParams.get('violationId')
        const violationTypeName = searchParams.get('violationTypeName')

        console.log(violationTypeName)

        if (noticeId) {
          await getNoticeById(noticeId).then(data => {
            if (data) {
              setNotice(data)
              getInfoById(data.recipient).then(data => {
                setRecipient(data)
              })

              getInfoById(data.sender).then(data => {
                setSender(data)
              })
            }
          })
        }

        if (violationId) {
          await getViolationById(violationId).then(data => {
            setViolation(data)
          })
        }

        if (violationTypeName) {
          await getViolationTypeByName(violationTypeName).then(data => {
            setViolationType(data)
          })
        }
      }

      fetchData()
    })
  }, [])

  const withinNumDays = 1
  const deadline = notice?.createdAt
    ? format(addDays(notice?.createdAt, withinNumDays), 'MMMM dd, yyyy')
    : ''

  return isPending ? (
    <Flex justifyContent='center' alignItems='center' minHeight='100vh'>
      <Spinner />
    </Flex>
  ) : (
    <div>
      <Box textAlign='right'>
        <BackButton />
      </Box>
      <Center flexDir='column'>
        <>
          <Text
            my='10px'
            fontSize='xl'
            fontWeight='bold'
            fontFamily='font.heading'
          >
            {`#V${violation?.number.toString().padStart(4, '0')}`} Violation
            Notice 📩
          </Text>
          <Box borderWidth='1px' p={10} borderRadius='md' w='60vw'>
            <Stack spacing={5} fontFamily='font.body' fontSize='md'>
              <Flex justifyContent='space-between'>
                {/* Recipient */}
                <Text>
                  Dear{' '}
                  <span className='font-bold'>
                    {recipient?.firstName} {recipient?.lastName}
                  </span>
                  ,
                </Text>
                {/* Date Received */}
                <Text fontWeight='bold'>
                  {notice?.createdAt
                    ? format(
                        new Date(notice?.createdAt)
                          ?.toISOString()
                          .split('T')[0],
                        'MMMM dd, yyyy'
                      )
                    : ''}
                </Text>
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
                    <span className='font-semibold'>
                      {violation?.violationDate
                        ? format(
                            new Date(violation?.violationDate)
                              ?.toISOString()
                              .split('T')[0],
                            'MMMM dd, yyyy'
                          )
                        : ''}
                    </span>
                  </ListItem>
                  {/* Violation Type */}
                  <ListItem>
                    Violation Type:{' '}
                    <span className='font-semibold'>
                      {' '}
                      {violationType?.title}
                    </span>
                  </ListItem>
                  {/* Penalty Fee */}
                  <ListItem>
                    Penalty Fee:{' '}
                    <span className='font-semibold text-red-500'>
                      ₱ {violationType?.fee}
                    </span>
                  </ListItem>
                </UnorderedList>
              </Box>

              <Text textAlign='justify'>
                Please be aware that this violation requires immediate
                attention, and the corresponding fee must be settled within{' '}
                <span className='font-semibold'>
                  {withinNumDays.toString()}{' '}
                  {withinNumDays.toString() === '1' ? 'day' : 'days'}
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
                <Text>
                  {sender?.firstName} {sender?.lastName}
                </Text>
                <Text color='grey'>{sender?.committee}</Text>
              </Box>
            </Stack>
          </Box>
        </>
      </Center>
    </div>
  )
}
