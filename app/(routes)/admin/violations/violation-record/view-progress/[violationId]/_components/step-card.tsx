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
  Input
} from '@chakra-ui/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Link from 'next/link'

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
}

export default function StepCard ({
  stepIndex,
  processSteps,
  tempViolation
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
    index: caseActivities.length - 1,
    count: caseActivities.length
  })

  return (
    <Card
      shadow='lg'
      my='1.5rem'
      h='80vh'
      p='10px 10px 20px 10px'
      overflowY='auto'
    >
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
      <CardBody>
        <>
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

          {/* Step 5 Timeline */}
          {stepIndex === 4 && (
            <Flex>
              <Box w='30%'>
                <Box>
                  <Text
                    fontWeight='semibold'
                    fontFamily='font.heading'
                    lineHeight={1}
                  >
                    Case Activities
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
                  <Button
                    type='submit'
                    colorScheme='yellow'
                    size='sm'
                    w='min-content'
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Flex>
          )}

          {/* INFORMATION TABLES */}
          <Flex gap={5} mt={10}>
            <TableContainer>
              <Table
                variant='unstyled'
                fontFamily='font.body'
                size='sm'
                w='400px'
              >
                <Tbody>
                  {/* Step 1 Information Table Part 1 */}
                  {stepIndex === 0 && (
                    <>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Violation Number
                        </Th>
                        <Td border='3px double black'>
                          #V
                          {tempViolation.number.toString().padStart(4, '0')}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Submitted By
                        </Th>
                        <Td border='3px double black'>
                          {tempViolation.submittedBy
                            ? `${tempViolation.submittedBy}`
                            : ''}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Person/s Involved
                        </Th>
                        <Td border='3px double black'>
                          <UnorderedList>
                            {tempViolation.personsInvolved.map(
                              (person, index) => (
                                <ListItem key={index}>{person}</ListItem>
                              )
                            )}
                          </UnorderedList>
                        </Td>
                      </Tr>
                    </>
                  )}
                  {/* Step 3 Information Table */}
                  {stepIndex === 2 && (
                    <Tr whiteSpace='normal'>
                      <Th border='3px double black' w='110px'>
                        Officer Assigned
                      </Th>
                      <Td
                        border='3px double black'
                        color={
                          tempViolation.officerAssigned ? 'black' : 'lightgray'
                        }
                        fontStyle={
                          tempViolation.officerAssigned ? 'normal' : 'italic'
                        }
                      >
                        {tempViolation.officerAssigned
                          ? `${tempViolation.officerAssigned}`
                          : 'Unassigned'}
                      </Td>
                    </Tr>
                  )}
                  {/* Step 6 Information Table */}
                  {stepIndex === 5 && (
                    <>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Violation Type
                        </Th>
                        <Td border='3px double black'>
                          {tempViolation.violationType}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Penalty Fee
                        </Th>
                        <Td border='3px double black'>
                          ₱ {tempViolation.violationFee}
                        </Td>
                      </Tr>
                    </>
                  )}
                </Tbody>
              </Table>
            </TableContainer>

            {stepIndex === 0 && (
              // Step 1 Information Table Part 2
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
                          {/* {tempViolation.createdAt
                                  ? format(
                                      new Date(tempViolation.createdAt)
                                        ?.toISOString()
                                        .split('T')[0],
                                      'MMMM dd, yyyy'
                                    )
                                  : ''} */}
                          {tempViolation.createdAt}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Date of Violation
                        </Th>
                        <Td border='3px double black'>
                          {/* {tempViolation.violationDate
                                  ? format(
                                      new Date(tempViolation.violationDate)
                                        ?.toISOString()
                                        .split('T')[0],
                                      'MMMM dd, yyyy'
                                    )
                                  : ''} */}
                          {tempViolation.violationDate}
                        </Td>
                      </Tr>
                      <Tr whiteSpace='normal'>
                        <Th border='3px double black' w='110px'>
                          Violation Type
                        </Th>
                        <Td border='3px double black'>
                          {tempViolation.violationType}
                        </Td>
                      </Tr>
                    </>
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Flex>
          {/* Violation Description */}
          {stepIndex === 0 && (
            <Text
              fontSize='xs'
              fontFamily='font.body'
              color='grey'
              textAlign='justify'
              mt={5}
            >
              <span className='font-bold'>Violation Description:</span> <br />{' '}
              {tempViolation.violationDescription}
            </Text>
          )}
        </>
      </CardBody>
    </Card>
  )
}
