'use client'

import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
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
  Card,
  CardBody,
  Box,
  Flex,
  Text,
  UnorderedList,
  ListItem,
  CardHeader,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Button,
  Link
} from '@chakra-ui/react'
import { PersonalInfo } from '@prisma/client'
import { format } from 'date-fns'

interface ProgressDetailsProps {
  reportDetails: any
}

export const ProgressDetails: React.FC<ProgressDetailsProps> = ({
  reportDetails
}) => {
  const processSteps = [
    {
      title: 'Violation Form Submission',
      description:
        'Homeowners submit violation reports through the Violation Monitoring module in the MIS.',
      details: [
        'Homeowners provide details about the alleged violation, including the type of violation, date, and a detailed description of the violation.',
        'Supporting evidence such as photos or documents may be attached to the violation report.'
      ]
    },
    {
      title: 'Review by Environment and Security Committee',
      description:
        'The Environment and Security Committee receives and reviews the violation report.',
      details: [
        'The Environment and Security Committee receives the violation report in the MIS and assigns an officer-in-charge to oversee its resolution.',
        'The Officer-in-Charge makes a decision whether the reported violation is valid and if any action is required.'
      ]
    },
    {
      title: 'Issue Resolution and Enforcement with Penalty Fee',
      description:
        'The Officer-in-Charge takes appropriate actions based on their decision, including issuing a violation notice to the homeowner.',
      details: [
        'The alleged violator receives a notice outlining the nature of the violation, required corrective actions, and a penalty fee.',
        'The homeowner is informed that the penalty fee is added to their statement of account, which can be accessed via the Finance Management module.'
      ]
    }
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: reportDetails.violation.step - 1,
    count: processSteps.length
  })

  return (
    <div>
      <Flex justifyContent='space-between'>
        <Flex className='gap-x-4'>
          <Heading
            title={`#V${reportDetails.violation.number
              .toString()
              .padStart(4, '0')} - Violation Enforcement Progress`}
            description="View the progress of a selected violation case within the Homeowners' Association."
          />
          <Badge
            className={cn(
              'w-[max-content] h-[min-content] px-3 py-2 text-center justify-center text-sm',
              reportDetails.violation.status === 'Appealed'
                ? 'bg-green-700'
                : reportDetails.violation.status === 'Pending'
                ? 'bg-red-700'
                : reportDetails.violation.status === 'Under Review'
                ? 'bg-yellow-600'
                : reportDetails.violation.status === 'Closed'
                ? ''
                : 'display-none'
            )}
          >
            {reportDetails.violation.status}
          </Badge>
        </Flex>
        <Button
          as={Link}
          href='/admin/violations/violation-record'
          size='sm'
          _hover={{ textDecoration: 'none' }}
        >
          Go Back
        </Button>
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Flex gap={10} h='65vh'>
        <Stepper
          index={activeStep}
          orientation='vertical'
          width='min-content'
          gap='0'
          colorScheme='yellow'
          size='md'
          h='40vh'
        >
          {processSteps.map((step, index) => (
            <Step
              key={index}
              onClick={() => {
                if (index <= reportDetails.violation.step - 1)
                  // to make uncompleted steps unclickable
                  setActiveStep(index)
              }}
            >
              <StepIndicator
                className={
                  index <= reportDetails.violation.step - 1
                    ? 'text-black'
                    : 'text-gray-300'
                }
              >
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box
                flexShrink='0'
                fontFamily='font.body'
                w='10vw'
                onClick={() => Request}
              >
                {/* Stepper Number and Title */}
                <StepTitle>
                  <span
                    className={
                      index <= reportDetails.violation.step - 1
                        ? 'text-black'
                        : 'text-gray-300'
                    }
                  >
                    Step {index + 1}
                  </span>
                </StepTitle>
                <StepDescription>
                  <span
                    className={
                      index <= reportDetails.violation.step - 1
                        ? 'text-black'
                        : 'text-gray-300'
                    }
                  >
                    {step.title}
                  </span>
                </StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box w='100%'>
          <Card
            shadow='lg'
            mb='1rem'
            h='65vh'
            p='20px 20px 30px 20px'
            overflowY='auto'
          >
            <CardHeader pb={0}>
              <Text
                fontSize='sm'
                fontFamily='font.body'
                color='brand.500'
                fontWeight='bold'
              >
                Step {activeStep + 1}
              </Text>
              <Text fontSize='lg' fontFamily='font.heading' fontWeight='bold'>
                {/* Step Title */}
                {processSteps[activeStep].title}
              </Text>
              <Text fontFamily='font.body' textAlign='justify'>
                {/* Step Description */}
                {processSteps[activeStep].description}
              </Text>
            </CardHeader>
            <Card />
            <CardBody>
              <Stack spacing={5}>
                {/* Step Details */}
                <Box fontFamily='font.body' fontSize='sm' textAlign='justify'>
                  <Text>Details:</Text>
                  <UnorderedList ml={7}>
                    {processSteps[activeStep].details.map((detail, index) => (
                      <ListItem key={index}>{detail}</ListItem>
                    ))}
                  </UnorderedList>
                </Box>

                {/* INFORMATION TABLES */}
                <Flex gap={5}>
                  <TableContainer>
                    <Table
                      variant='unstyled'
                      fontFamily='font.body'
                      size='sm'
                      w='400px'
                    >
                      <Tbody>
                        {/* Step 1 Information Table Part 1 */}
                        {activeStep === 0 && (
                          <>
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
                                    (item: PersonalInfo) => (
                                      <ListItem key={item.id}>
                                        {item.firstName} {item.lastName}
                                      </ListItem>
                                    )
                                  )}
                                </UnorderedList>
                              </Td>
                            </Tr>
                          </>
                        )}
                        {/* Step 2 Information Table */}
                        {activeStep === 1 && (
                          <Tr whiteSpace='normal'>
                            <Th border='3px double black' w='110px'>
                              Officer-in-Charge
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
                        )}
                        {/* Step 5 Information Table */}
                        {activeStep === 2 && (
                          <>
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
                                ₱ {reportDetails.violationType.fee}
                              </Td>
                            </Tr>
                          </>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  {activeStep === 0 && (
                    // Step 1 Information Table Part 2
                    <TableContainer>
                      <Table
                        variant='unstyled'
                        fontFamily='font.body'
                        size='sm'
                        maxWidth='400px'
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
                                      new Date(
                                        reportDetails.violation.createdAt
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
                  )}
                </Flex>
                {/* Violation Description */}
                {activeStep === 0 && (
                  <Text
                    fontSize='xs'
                    fontFamily='font.body'
                    color='grey'
                    textAlign='justify'
                  >
                    <span className='font-bold'>Violation Description:</span>{' '}
                    <br /> {reportDetails.violation.description}
                  </Text>
                )}
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </div>
  )
}

export default ProgressDetails
