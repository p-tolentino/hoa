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
import { report } from 'process'
import { format } from 'date-fns'
import { PersonalInfo } from '@prisma/client'
import ViewProgressReport from './view-progress-report'
import ViewReviewResults from './view-review-results'

interface ProcessStep {
  value: string
  title: string
  description: string
  details: string[]
}

interface TempDispute {
  step: number
  number: number
  status: string
  submittedBy: string
  personComplained: string
  officerAssigned: string
  disputeType: string
  createdAt: string
  disputeDate: string
  disputeDescription: string
  reasonToClose: string
}

interface StepCardProps {
  stepIndex: number
  processSteps: ProcessStep[]
  tempDispute: TempDispute
  reportDetails: any
}

export default function StepCard ({
  stepIndex,
  processSteps,
  tempDispute,
  reportDetails
}: StepCardProps) {
  const keyActivities = [
    {
      title: 'activityTitle1',
      dueDate: 'activityDueDate1',
      datePerformed: 'activityDatePerformed1'
    },
    {
      title: 'activityTitle2',
      dueDate: 'activityDueDate2',
      datePerformed: 'activityDatePerformed2'
    },
    {
      title: 'activityTitle3',
      dueDate: 'activityDueDate3',
      datePerformed: 'activityDatePerformed3'
    },
    {
      title: 'activityTitle4',
      dueDate: 'activityDueDate4',
      datePerformed: 'activityDatePerformed4'
    }
  ]

  const { activeStep } = useSteps({
    index: 0,
    count: keyActivities.length
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
            <Box>
              <Box>
                <Text
                  fontWeight='semibold'
                  fontFamily='font.heading'
                  lineHeight={1}
                >
                  Dispute Form Contents
                </Text>
                <Text fontFamily='font.body' fontSize='sm' color='grey'>
                  Date received: March 22, 2024
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
                          #V
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
                          Complainee
                        </Th>
                        <Td border='3px double black'>
                          {reportDetails.personComplained
                            ? `${reportDetails.personComplained}`
                            : ''}
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
                    width='400px'
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
                            {reportDetails.dispute.type}
                          </Td>
                        </Tr>
                      </>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
              <Text
                fontSize='xs'
                fontFamily='font.body'
                color='grey'
                textAlign='justify'
                mt={5}
              >
                <span className='font-bold'>Dispute Description:</span> <br />{' '}
                {reportDetails.dispute.description}
              </Text>
            </Box>
          )}

          {/* Step 2 Content */}
          {stepIndex === 1 && (
            <Box>
              {/* If a review has NOT been made */}
              <Box
                h='24vh'
                border='1px solid lightgray'
                borderRadius={5}
                p={3}
                overflowY='auto'
                flex={3}
              >
                <Center color='gray' h='50%' fontFamily='font.body'>
                  No results to show.
                </Center>
              </Box>

              {/* If a review has been made */}
              {/* <ViewReviewResults
                keyActivities={keyActivities}
                activeStep={activeStep}
                reportDetails={reportDetails}
              /> */}
            </Box>
          )}

          {/* Step 3 Content */}
          {stepIndex === 2 && (
            <ViewReviewResults
              keyActivities={keyActivities}
              activeStep={activeStep}
              reportDetails={reportDetails}
            />
          )}

          {/* Step 4 Content */}
          {stepIndex === 3 && (
            <Box>
              {/* If a dispute letter has NOT been made */}
              <Box
                h='24vh'
                border='1px solid lightgray'
                borderRadius={5}
                p={3}
                overflowY='auto'
                flex={3}
              >
                <Center color='gray' h='50%' fontFamily='font.body'>
                  No results to show.
                </Center>
              </Box>

              {/* If a dispute letter has been made */}
              {/* <Link color='blue.500' fontFamily='font.body'>
                [Download] #V
                {reportDetails.dispute.number
                  .toString()
                  .padStart(4, '0')}{' '}
                Dispute Letter: {reportDetails.disputeType.title}
              </Link> */}
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
                  orientation='vertical'
                  w='max-content'
                  h='50vh'
                  p='1rem'
                  gap='0'
                  colorScheme='green'
                  size='md'
                  overflowY='auto'
                >
                  {keyActivities.map((activity, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      <Box fontFamily='font.body' w='10vw'>
                        <StepTitle>
                          <ViewProgressReport activityTitle={activity.title} />
                        </StepTitle>
                        <StepDescription className='text-xs'>
                          {activity.dueDate}
                          <br />
                          {activity.datePerformed}
                        </StepDescription>
                      </Box>
                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Flex>
          )}

          {/* Step 6 Content */}
          {stepIndex === 5 && (
            <Box>
              {/* If a final assessment has NOT been made */}
              {/* <Box
                h='24vh'
                border='1px solid lightgray'
                borderRadius={5}
                p={3}
                overflowY='auto'
                flex={3}
              >
                <WriteFinalAssessment />
                <Center color='gray' h='50%' fontFamily='font.body'>
                  No results to show.
                </Center>
              </Box> */}

              {/* If a final assessment has been made */}
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
                    Date created: March 22, 2024
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nemo atque maxime nostrum voluptatum mollitia natus a
                      aspernatur corrupti molestias asperiores quia fugit, sint
                      repudiandae odit laborum alias earum modi sequi quod
                      illum, necessitatibus dolores. Voluptatum qui odio ratione
                      omnis ea?
                    </Text>
                  </Box>
                </Box>

                {/* only if dispute case is CONCLUDED with penalty fee */}
                <Box>
                  <Text
                    fontWeight='semibold'
                    fontFamily='font.heading'
                    lineHeight={1}
                  >
                    Dispute Resolution Information
                  </Text>
                  <Text fontFamily='font.body' fontSize='sm' color='grey'>
                    Date enforced: March 22, 2024
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
                              {reportDetails.dispute.type}
                            </Td>
                          </Tr>
                          <Tr whiteSpace='normal'>
                            <Th border='3px double black' w='110px'>
                              Reason to Close
                            </Th>
                            <Td border='3px double black'>
                              {reportDetails.reasonToClose}
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  )
}
