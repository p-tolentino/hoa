import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  UnorderedList,
  ListItem,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Stack,
  Center,
  Divider,
  Link
} from '@chakra-ui/react'
import { format } from 'date-fns'
import {
  DisputeOfficerActivity,
  DisputeProgress,
  UserRole
} from '@prisma/client'
import WriteReviewResults from './write-review-results'
import ViewProgressReport from './view-progress-report'
import ProgressReportForm from './progress-report-form'
import ViewReviewResults from './view-review-results'
import WriteFinalAssessment from './write-final-assessment'
import WriteDisputeLetter from './write-dispute-letter'
import { useCurrentUser } from '@/hooks/use-current-user'

interface ProcessStep {
  value: string
  title: string
  description: string
  details: string[]
}

interface StepCardProps {
  stepIndex: number
  processSteps: ProcessStep[]
  reportDetails: any
}

export default function StepCard ({
  stepIndex,
  processSteps,
  reportDetails
}: StepCardProps) {
  const user = useCurrentUser()
  const { activeStep } = useSteps({
    index: 0,
    count: reportDetails.officerActivities.length
  })

  return (
    <Card shadow='lg' my='1.5rem' h='62vh' p='10px 10px 20px 10px'>
      <CardHeader pb={0}>
        <Text
          fontSize='sm'
          fontFamily='font.body'
          color='brand.500'
          fontWeight='bold'
        >
          Step {stepIndex + 1}
        </Text>
        <Text fontSize='lg' fontFamily='font.heading' fontWeight='bold'>
          {/* Step Title */}
          {processSteps[stepIndex].title}
        </Text>
        <Text fontFamily='font.body' textAlign='justify'>
          {/* Step Description */}
          {processSteps[stepIndex].description}
        </Text>
        <Divider mt='0.5rem' />
      </CardHeader>
      <CardBody pt={2}>
        <Box overflowY='auto' h='42vh'>
          <Box
            fontFamily='font.body'
            fontSize='sm'
            textAlign='justify'
            mb='2rem'
          >
            {/* Step Details */}
            <Text>Details:</Text>
            <UnorderedList mb='1rem' ml={7}>
              {processSteps[stepIndex].details.map((detail, index) => (
                <ListItem key={index}>{detail}</ListItem>
              ))}
            </UnorderedList>
          </Box>

          {/* Step 1 Content */}
          {stepIndex === 0 && (
            <Box pb={5}>
              <Box>
                <Text
                  fontWeight='semibold'
                  fontFamily='font.heading'
                  lineHeight={1}
                >
                  Dispute Form Contents
                </Text>
                <Text fontFamily='font.body' fontSize='sm' color='grey'>
                  Date received:{' '}
                  {reportDetails.dispute.createdAt
                    ? format(
                        new Date(reportDetails.dispute.createdAt)
                          ?.toISOString()
                          .split('T')[0],
                        'MMMM dd, yyyy'
                      )
                    : ''}
                </Text>
              </Box>
              <Flex gap={5} pt='1rem'>
                <TableContainer>
                  <Table
                    variant='unstyled'
                    fontFamily='font.body'
                    size='sm'
                    w='400px'
                  >
                    <Tbody>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Dispute Number
                        </Th>
                        <Td border='3px double black'>
                          #D
                          {reportDetails.dispute.number
                            .toString()
                            .padStart(4, '0')}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Submitted By
                        </Th>
                        <Td border='3px double black'>
                          {reportDetails.submittedBy
                            ? `${reportDetails.submittedBy.firstName} ${reportDetails.submittedBy.lastName}`
                            : ''}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Person Complained
                        </Th>
                        <Td border='3px double black'>
                          {reportDetails.personComplained
                            ? `${reportDetails.personComplained.firstName} ${reportDetails.personComplained.lastName}`
                            : ''}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Violation Description
                        </Th>
                        <Td border='3px double black' fontSize='xs'>
                          {reportDetails.dispute.description}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table
                    variant='unstyled'
                    fontFamily='font.body'
                    size='sm'
                    width={
                      reportDetails.dispute.documents !== null
                        ? '100%'
                        : '400px'
                    }
                  >
                    <Tbody>
                      <>
                        <Tr whiteSpace='normal'>
                          <Th border='3px double black' w='110px'>
                            Date Submitted
                          </Th>
                          <Td border='3px double black'>
                            {reportDetails.dispute.createdAt
                              ? format(
                                  new Date(reportDetails.dispute.createdAt)
                                    ?.toISOString()
                                    .split('T')[0],
                                  'MMMM dd, yyyy'
                                )
                              : ''}
                          </Td>
                        </Tr>
                        <Tr whiteSpace='normal'>
                          <Th border='3px double black' w='110px'>
                            Date of Dispute
                          </Th>
                          <Td border='3px double black'>
                            {reportDetails.dispute.disputeDate
                              ? format(
                                  new Date(reportDetails.dispute.disputeDate)
                                    ?.toISOString()
                                    .split('T')[0],
                                  'MMMM dd, yyyy'
                                )
                              : ''}
                          </Td>
                        </Tr>
                        <Tr whiteSpace='normal'>
                          <Th border='3px double black' w='110px'>
                            Dispute Type
                          </Th>
                          <Td border='3px double black'>
                            {reportDetails.disputeType.title}
                          </Td>
                        </Tr>
                        <Tr whiteSpace='normal'>
                          <Th border='3px double black' w='110px'>
                            Supporting Documents
                          </Th>
                          <Td
                            border='3px double black'
                            color={
                              reportDetails.dispute.documents !== null
                                ? 'black'
                                : 'lightgrey'
                            }
                          >
                            {reportDetails.dispute.documents !== null ? (
                              <UnorderedList>
                                {reportDetails.dispute.documents.map(
                                  (document: string, index: number) => (
                                    <ListItem key={index}>
                                      <a href={document} target='_blank'>
                                        {document}
                                      </a>
                                    </ListItem>
                                  )
                                )}
                              </UnorderedList>
                            ) : (
                              'N/A'
                            )}
                          </Td>
                        </Tr>
                      </>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </Box>
          )}

          {/* Step 2 Content */}
          {stepIndex === 1 && (
            <Box>
              {reportDetails.dispute.committeeReview ? (
                // <ViewReviewResults
                //   keyActivities={keyActivities}
                //   activeStep={activeStep}
                //   reportDetails={reportDetails}
                // />
                <Box
                  h='24vh'
                  border='1px solid lightgray'
                  borderRadius={5}
                  p={3}
                  overflowY='auto'
                  flex={3}
                >
                  <Center color='gray' h='50%' fontFamily='font.body'>
                    {reportDetails.dispute.committeeReview}
                  </Center>
                </Box>
              ) : (
                <Box
                  h='24vh'
                  border='1px solid lightgray'
                  borderRadius={5}
                  p={3}
                  overflowY='auto'
                  flex={3}
                >
                  {reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER && (
                      <WriteReviewResults
                        dispute={reportDetails.dispute}
                        committee={reportDetails.committee}
                      />
                    ))}
                  <Center color='gray' h='50%' fontFamily='font.body'>
                    No results to show.
                  </Center>
                </Box>
              )}
            </Box>
          )}

          {/* Step 3 Content */}
          {stepIndex === 2 && (
            <ViewReviewResults
              activeStep={activeStep}
              reportDetails={reportDetails}
            />
          )}

          {/* Step 4 Content */}
          {stepIndex === 3 && (
            <Box>
              {reportDetails.dispute.letterSent ? (
                <Link color='blue.500' fontFamily='font.body'>
                  [Download] #D
                  {reportDetails.dispute.number
                    .toString()
                    .padStart(4, '0')}{' '}
                  Dispute Letter: {reportDetails.disputeType.title}
                </Link>
              ) : (
                <Box
                  h='24vh'
                  border='1px solid lightgray'
                  borderRadius={5}
                  p={3}
                  overflowY='auto'
                  flex={3}
                >
                  {reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER && (
                      <WriteDisputeLetter reportDetails={reportDetails} />
                    ))}
                  <Center color='gray' h='50%' fontFamily='font.body'>
                    No results to show.
                  </Center>
                </Box>
              )}
            </Box>
          )}

          {/* Step 5 Content */}
          {stepIndex === 4 && (
            <Flex>
              <Box w='40%'>
                <Box>
                  <Text
                    fontWeight='semibold'
                    fontFamily='font.heading'
                    lineHeight={1}
                  >
                    Key Activities
                  </Text>
                  <Text fontFamily='font.body' fontSize='sm'>
                    You may click the activity title to view its progress
                    reports.
                  </Text>
                </Box>
                <Stepper
                  index={activeStep}
                  orientation={
                    reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER &&
                      reportDetails.dispute.status !== 'Closed')
                      ? 'vertical'
                      : 'horizontal'
                  }
                  w={
                    reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER &&
                      reportDetails.dispute.status !== 'Closed')
                      ? 'max-content'
                      : '70vw'
                  }
                  h={
                    reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER &&
                      reportDetails.dispute.status !== 'Closed')
                      ? '35vh'
                      : 'max-content'
                  }
                  p='1rem'
                  gap={
                    reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER &&
                      reportDetails.dispute.status !== 'Closed')
                      ? '10'
                      : '3'
                  }
                  colorScheme='green'
                  size='md'
                  overflowY='auto'
                >
                  {reportDetails.officerActivities.map(
                    (activity: DisputeOfficerActivity) => (
                      <Step key={activity.id}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>
                        <Box
                          fontFamily='font.body'
                          w={
                            reportDetails.dispute.officerAssigned ===
                              user?.id ||
                            (user?.role === UserRole.SUPERUSER &&
                              reportDetails.dispute.status !== 'Closed')
                              ? '15vw'
                              : 'max-content'
                          }
                        >
                          <StepTitle>
                            <ViewProgressReport
                              activity={activity}
                              progressReports={reportDetails.progressReports.filter(
                                (progress: DisputeProgress) =>
                                  progress.activity === activity.id
                              )}
                            />
                          </StepTitle>
                          <StepDescription className='text-xs'>
                            <span className='text-sm text-gray-500'>
                              {' (Deadline: '}
                              {activity.deadline
                                ? format(
                                    new Date(activity.deadline)
                                      ?.toISOString()
                                      .split('T')[0],
                                    'MMMM dd, yyyy'
                                  )
                                : ''}
                              {')'}
                            </span>
                          </StepDescription>
                        </Box>
                        <StepSeparator />
                      </Step>
                    )
                  )}
                </Stepper>
              </Box>
              {/* Progress Report Form */}
              {reportDetails.dispute.officerAssigned === user?.id ||
                reportDetails.officerActivities.every(
                  (activity: DisputeOfficerActivity) => activity.isDone === true
                ) ||
                (user?.role === UserRole.SUPERUSER &&
                  reportDetails.dispute.status !== 'Closed' && (
                    <ProgressReportForm
                      keyActivities={reportDetails.officerActivities}
                    />
                  ))}
            </Flex>
          )}

          {/* Step 6 Content */}
          {stepIndex === 5 && (
            <Box>
              {reportDetails.dispute.finalReview ? (
                <Flex gap={10}>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      fontFamily='font.heading'
                      lineHeight={1}
                    >
                      Dispute Case: Review Results
                    </Text>
                    <Text fontFamily='font.body' fontSize='sm' color='grey'>
                      Date submitted final review:{' '}
                      {reportDetails.dispute.finalReviewDate
                        ? format(
                            new Date(reportDetails.dispute.finalReviewDate)
                              ?.toISOString()
                              .split('T')[0],
                            'MMMM dd, yyyy'
                          )
                        : ''}
                    </Text>
                    <Box
                      h='18vh'
                      border='1px solid lightgray'
                      borderRadius={5}
                      p={3}
                      overflowY='auto'
                      flex={3}
                      mt='1rem'
                      w='600px'
                    >
                      <Text
                        fontFamily='font.body'
                        fontSize='sm'
                        textAlign='justify'
                      >
                        {reportDetails.dispute.finalReview}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      fontFamily='font.heading'
                      lineHeight={1}
                    >
                      Dispute Resolution Information
                    </Text>
                    <Text fontFamily='font.body' fontSize='sm' color='grey'>
                      Date closed:{' '}
                      {reportDetails.dispute.finalReviewDate
                        ? format(
                            new Date(reportDetails.dispute.finalReviewDate)
                              ?.toISOString()
                              .split('T')[0],
                            'MMMM dd, yyyy'
                          )
                        : ''}
                    </Text>

                    <Stack w='400px' spacing='0.5rem' pt='1rem'>
                      <TableContainer>
                        <Table
                          variant='unstyled'
                          fontFamily='font.body'
                          size='sm'
                          w='400px'
                        >
                          <Tbody>
                            <Tr whiteSpace='normal'>
                              <Th border='3px double black' w='110px'>
                                Dispute Type
                              </Th>
                              <Td border='3px double black'>
                                {reportDetails.disputeType.title}
                              </Td>
                            </Tr>
                            <Tr whiteSpace='normal'>
                              <Th border='3px double black' w='110px'>
                                Reason to Close
                              </Th>
                              <Td border='3px double black'>
                                {reportDetails.dispute.reasonToClose}
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Stack>
                  </Box>
                </Flex>
              ) : (
                <Box
                  h='24vh'
                  border='1px solid lightgray'
                  borderRadius={5}
                  p={3}
                  overflowY='auto'
                  flex={3}
                >
                  {reportDetails.dispute.officerAssigned === user?.id ||
                    (user?.role === UserRole.SUPERUSER && (
                      <WriteFinalAssessment reportDetails={reportDetails} />
                    ))}
                  <Center color='gray' h='50%' fontFamily='font.body'>
                    No results to show.
                  </Center>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  )
}
