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
  Textarea,
  Button,
  Stack,
  Input,
  Center,
  ButtonGroup
} from '@chakra-ui/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Link from 'next/link'
import { report } from 'process'
import { format } from 'date-fns'
import { PersonalInfo } from '@prisma/client'
import WriteReviewResults from './write-review-results'

interface ProcessStep {
  value: string
  title: string
  description: string
  details: string[]
}

interface TempViolation {
  step: number
  number: number
  status: string
  submittedBy: string
  personsInvolved: string[]
  officerAssigned: string
  violationType: string
  violationFee: string
  createdAt: string
  violationDate: string
  violationDescription: string
}

interface StepCardProps {
  stepIndex: number
  processSteps: ProcessStep[]
  tempViolation: TempViolation
  reportDetails: any
}

export default function StepCard ({
  stepIndex,
  processSteps,
  tempViolation,
  reportDetails
}: StepCardProps) {
  const caseActivities = [
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
    count: caseActivities.length
  })

  return (
    <Card shadow='lg' my='1.5rem' h='66vh' p='10px 10px 20px 10px'>
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
      </CardHeader>
      <Card />
      <CardBody pt={2}>
        <Box overflowY='auto' h='50vh'>
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
                  Violation Form Contents
                </Text>
                <Text fontFamily='font.body' fontSize='sm' color='grey'>
                  Date received: March 22, 2024
                </Text>
              </Box>
              <Flex gap={5} pt='1.5rem'>
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
                          Violation Number
                        </Th>
                        <Td border='3px double black'>
                          #V
                          {reportDetails.violation.number
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
                          Person/s Involved
                        </Th>
                        <Td border='3px double black'>
                          <UnorderedList>
                            {reportDetails.personsInvolved.map(
                              (person: PersonalInfo, index: number) => (
                                <ListItem key={index}>
                                  {person.firstName} {person.lastName}
                                </ListItem>
                              )
                            )}
                          </UnorderedList>
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
                            {reportDetails.violation.createdAt
                              ? format(
                                  new Date(reportDetails.violation.createdAt)
                                    ?.toISOString()
                                    .split('T')[0],
                                  'MMMM dd, yyyy'
                                )
                              : ''}
                          </Td>
                        </Tr>
                        <Tr whiteSpace='normal'>
                          <Th border='3px double black' w='110px'>
                            Date of Violation
                          </Th>
                          <Td border='3px double black'>
                            {reportDetails.violation.violationDate
                              ? format(
                                  new Date(
                                    reportDetails.violation.violationDate
                                  )
                                    ?.toISOString()
                                    .split('T')[0],
                                  'MMMM dd, yyyy'
                                )
                              : ''}
                          </Td>
                        </Tr>
                        <Tr whiteSpace='normal'>
                          <Th border='3px double black' w='110px'>
                            Violation Type
                          </Th>
                          <Td border='3px double black'>
                            {reportDetails.violationType.title}
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
                <span className='font-bold'>Violation Description:</span> <br />{' '}
                {reportDetails.violation.description}
              </Text>
            </Box>
          )}

          {/* Step 2 Content */}
          {stepIndex === 1 && (
            <Box>
              {/* If a review has NOT been made */}
              <Box
                h='32vh'
                border='1px solid lightgray'
                borderRadius={5}
                p={3}
                overflowY='auto'
                flex={3}
              >
                <WriteReviewResults />
                <Center color='gray' h='70%' fontFamily='font.body'>
                  No results to show.
                </Center>
              </Box>

              {/* If a review has been made */}
              {/* <Flex>
                <Box w='40%'>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      fontFamily='font.heading'
                      lineHeight={1}
                    >
                      Key Activities
                    </Text>
                    <Text fontFamily='font.body' fontSize='sm' color='grey'>
                      Date created: March 22, 2024
                    </Text>
                  </Box>
                  <Stepper
                    index={activeStep}
                    orientation='vertical'
                    w='max-content'
                    h='50vh'
                    p='1.5rem'
                    gap='0'
                    colorScheme='yellow'
                    size='md'
                    overflowY='auto'
                  >
                    {caseActivities.map((activity, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>
                        <Box fontFamily='font.body' w='10vw'>
                          <StepTitle>{activity.title}</StepTitle>
                          <StepDescription className='text-xs'>
                            {activity.dueDate}
                          </StepDescription>
                        </Box>
                        <StepSeparator />
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      fontFamily='font.heading'
                      lineHeight={1}
                    >
                      Officer Assigned
                    </Text>
                    <Text fontFamily='font.body' fontSize='sm' color='grey'>
                      Date assigned: March 22, 2024
                    </Text>
                  </Box>
                  <Stack w='400px' spacing='0.5rem' pt='1.5rem'>
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
                              Officer Assigned
                            </Th>
                            <Td
                              border='3px double black'
                              color={
                                reportDetails.officerAssigned
                                  ? 'black'
                                  : 'lightgray'
                              }
                              fontStyle={
                                reportDetails.officerAssigned
                                  ? 'normal'
                                  : 'italic'
                              }
                            >
                              {reportDetails.officerAssigned
                                ? `${reportDetails.officerAssigned.firstName} ${reportDetails.officerAssigned.lastName}`
                                : 'Unassigned'}
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <Text
                      fontSize='sm'
                      fontFamily='font.body'
                      textAlign='justify'
                    >
                      This officer has been assigned to oversee this case
                      exclusively. They are the sole authorized individual to
                      provide progress reports regarding this case.
                    </Text>
                  </Stack>
                </Box>
              </Flex> */}
            </Box>
          )}

          {/* Step 3 Content */}
          {stepIndex === 2 && (
            <Box>
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
                    <Text fontFamily='font.body' fontSize='sm' color='grey'>
                      Date created: March 22, 2024
                    </Text>
                  </Box>
                  <Stepper
                    index={activeStep}
                    orientation='vertical'
                    w='max-content'
                    h='50vh'
                    p='1.5rem'
                    gap='0'
                    colorScheme='yellow'
                    size='md'
                    overflowY='auto'
                  >
                    {caseActivities.map((activity, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>
                        <Box fontFamily='font.body' w='10vw'>
                          <StepTitle>{activity.title}</StepTitle>
                          <StepDescription className='text-xs'>
                            {activity.dueDate}
                          </StepDescription>
                        </Box>
                        <StepSeparator />
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      fontFamily='font.heading'
                      lineHeight={1}
                    >
                      Officer Assigned
                    </Text>
                    <Text fontFamily='font.body' fontSize='sm' color='grey'>
                      Date assigned: March 22, 2024
                    </Text>
                  </Box>
                  <Stack w='400px' spacing='0.5rem' pt='1.5rem'>
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
                              Officer Assigned
                            </Th>
                            <Td
                              border='3px double black'
                              color={
                                reportDetails.officerAssigned
                                  ? 'black'
                                  : 'lightgray'
                              }
                              fontStyle={
                                reportDetails.officerAssigned
                                  ? 'normal'
                                  : 'italic'
                              }
                            >
                              {reportDetails.officerAssigned
                                ? `${reportDetails.officerAssigned.firstName} ${reportDetails.officerAssigned.lastName}`
                                : 'Unassigned'}
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <Text
                      fontSize='sm'
                      fontFamily='font.body'
                      textAlign='justify'
                    >
                      This officer has been assigned to oversee this case
                      exclusively. They are the sole authorized individual to
                      provide progress reports regarding this case.
                    </Text>
                  </Stack>
                </Box>
              </Flex>
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
                  p='1.5rem'
                  gap='0'
                  colorScheme='yellow'
                  size='md'
                  overflowY='auto'
                >
                  {caseActivities.map((activity, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      <Box fontFamily='font.body' w='10vw'>
                        <StepTitle
                          as={Link}
                          href=''
                          className='text-blue-500 hover:underline'
                        >
                          {activity.title}
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
              {/* Progress Report Form */}
              <form>
                <Stack spacing='15px'>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      fontFamily='font.heading'
                      lineHeight={1}
                    >
                      Write a progress report
                    </Text>
                    <Text fontFamily='font.body' fontSize='sm'>
                      Write a progress report for an activity to demonstrate
                      that it is being completed by the due date.
                    </Text>
                  </Box>
                  <Flex justifyContent='space-between' gap={5}>
                    <Input
                      type='string'
                      fontSize='md'
                      fontFamily='font.body'
                      fontWeight='semibold'
                      placeholder='Enter a progress title'
                    />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select activity' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {caseActivities.map((activity, index) => (
                            <SelectItem
                              key={'activity' + index}
                              value={'activity' + index}
                            >
                              {activity.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Flex>
                  <Textarea
                    fontSize='sm'
                    fontFamily='font.body'
                    placeholder='Write something...'
                    height='30vh'
                    resize='none'
                  ></Textarea>
                  <ButtonGroup>
                    <Button
                      type='submit'
                      colorScheme='yellow'
                      size='sm'
                      w='min-content'
                    >
                      Submit as Sub-Activity
                    </Button>
                    <Button
                      type='submit'
                      colorScheme='green'
                      size='sm'
                      w='min-content'
                    >
                      Submit & Mark Case as Closed
                    </Button>
                  </ButtonGroup>
                </Stack>
              </form>
            </Flex>
          )}

          {/* Step 6 Content */}
          {stepIndex === 5 && (
            <Box>
              <Box>
                <Text
                  fontWeight='semibold'
                  fontFamily='font.heading'
                  lineHeight={1}
                >
                  Violation Enforcement Information
                </Text>
                <Text fontFamily='font.body' fontSize='sm' color='grey'>
                  Date enforced: March 22, 2024
                </Text>
              </Box>
              <Stack w='400px' spacing='0.5rem' pt='1.5rem'>
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
                          Violation Type
                        </Th>
                        <Td border='3px double black'>
                          {reportDetails.violationType.title}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Penalty Fee
                        </Th>
                        <Td border='3px double black'>
                          ₱ {reportDetails.violationType.firstOffenseFee}{' '}
                          {/*!! CHANGE BASED ON RECORD */}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  )
}
