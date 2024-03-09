'use client'
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
  Link
} from '@chakra-ui/react'
import ViolationBylaws from './ViolationBylaws'
import React from 'react'

export default function ViolationEnforcement () {
  const processSteps = [
    {
      title: 'Violation Form Submission',
      description:
        'Homeowners submit violation reports through the Violation Monitoring module in the MIS.'
    },
    {
      title: 'Violation Intake and Validation',
      description:
        'HOA staff or designated personnel review submitted violation reports.'
    },
    {
      title: 'Acknowledgment of Violation Report Submission',
      description:
        "Homeowners receive acknowledgment of the violation report's receipt through the MIS."
    },
    {
      title: 'Review by Environment and Security Committee',
      description:
        'The Environment and Security Committee receives and reviews the violation report.'
    },
    {
      title: 'Issue Resolution and Enforcement with Penalty Fee',
      description:
        'The Officer-in-Charge takes appropriate actions based on their decision, including issuing a violation notice to the homeowner.'
    },
    {
      title: 'Live Updates on Violation Enforcement',
      description:
        'The reporter and alleged violator are kept informed throughout the process.'
    },
    {
      title: 'Record Keeping and Documentation',
      description:
        'The HOA maintains a comprehensive record of violation reports, actions taken, and penalty fees imposed.'
    }
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: processSteps.length
  })

  return (
    <div>
      <Box mb='1rem'>
        {/* Section Title */}
        <Text fontSize='xl' fontFamily='font.heading' fontWeight='bold'>
          Violation Enforcement
        </Text>
        {/* Section Description */}
        <Text fontSize='sm' fontFamily='font.body' color='grey'>
          You may click any step in the stepper to view its detailed
          description.
        </Text>
      </Box>
      <Flex gap={10} h='65vh'>
        <Stepper
          index={activeStep}
          orientation='vertical'
          width='min-content'
          gap='0'
          colorScheme='yellow'
          size='sm'
        >
          {processSteps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
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
                <StepTitle>Step {index + 1}</StepTitle>
                <StepDescription>{step.title}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box w='100%'>
          <Card shadow='lg' mb='1rem' h='45vh' p={5} overflowY='auto'>
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
              <Box fontFamily='font.body' fontSize='sm' textAlign='justify'>
                <Text>Details:</Text>
                <UnorderedList>
                  {/* Step 1 Details */}
                  {activeStep === 0 && (
                    <div>
                      <ListItem>
                        Homeowners provide details about the alleged violation,
                        including the type of violation, date, and a detailed
                        description of the violation.
                      </ListItem>
                      <ListItem>
                        Supporting evidence such as photos or documents may be
                        attached to the violation report.
                      </ListItem>
                    </div>
                  )}

                  {/* Step 2 Details */}
                  {activeStep === 1 && (
                    <div>
                      <ListItem>
                        HOA staff or designated personnel validate the violation
                        report by ensuring it contains sufficient information
                        and evidence.
                      </ListItem>
                      <ListItem>
                        They confirm that the reported issue falls within the
                        jurisdiction of the HOA's rules and regulations
                        indicated in the {<ViolationBylaws />}.
                      </ListItem>
                      <ListItem>
                        A unique identifier or tracking number is assigned to
                        the violation report for future reference.
                      </ListItem>
                    </div>
                  )}

                  {/* Step 3 Details */}
                  {activeStep === 2 && (
                    <div>
                      <ListItem>
                        Homeowners can view their violation report submission in
                        the{' '}
                        <Link
                          href='/admin/violations/submitted-violations'
                          color='blue.500'
                          textDecor='underline'
                        >
                          Submitted Violation Reports
                        </Link>{' '}
                        in the Violation Monitoring module.
                      </ListItem>
                      <ListItem>
                        The upcoming review process and potential follow-up
                        actions can also be accessed by clicking on the
                        submitted violation report.
                      </ListItem>
                    </div>
                  )}

                  {/* Step 4 Details */}
                  {activeStep === 3 && (
                    <div>
                      <ListItem>
                        The Environment and Security Committee receives the
                        violation report in the MIS and assigns an
                        officer-in-charge to oversee its resolution.
                      </ListItem>
                      <ListItem>
                        The Officer-in-Charge makes a decision whether the
                        reported violation is valid and if any action is
                        required.
                      </ListItem>
                    </div>
                  )}

                  {/* Step 5 Details */}
                  {activeStep === 4 && (
                    <div>
                      <ListItem>
                        The alleged violator receives a notice outlining the
                        nature of the violation, required corrective actions,
                        and a penalty fee.
                      </ListItem>
                      <ListItem>
                        The homeowner is informed that the penalty fee is added
                        to their{' '}
                        <Link
                          href='/admin/finance/statement-of-account'
                          color='blue.500'
                          textDecor='underline'
                        >
                          statement of account
                        </Link>
                        , which can be accessed via the Finance Management
                        module.
                      </ListItem>
                    </div>
                  )}

                  {/* Step 6 Details */}
                  {activeStep === 5 && (
                    <div>
                      <ListItem>
                        Homeowners receive notifications on committee decisions
                        and enforcement actions, including details of the
                        penalty fee.
                      </ListItem>
                      <ListItem>
                        The alleged violator can access the procedure on how to{' '}
                        <Link
                          href='#rectifyViolations'
                          color='blue.500'
                          textDecor='underline'
                        >
                          rectify the violation
                        </Link>{' '}
                        and{' '}
                        <Link
                          href='#payPenaltyFee'
                          color='blue.500'
                          textDecor='underline'
                        >
                          pay the penalty fee
                        </Link>{' '}
                        in the Violation Review Process Guide in the Violation
                        Monitoring module.
                      </ListItem>
                    </div>
                  )}

                  {/* Step 7 Details */}
                  {activeStep === 6 && (
                    <div>
                      <ListItem>
                        Comprehensive records of violation reports, actions
                        taken, and penalty fees imposed are maintained.
                      </ListItem>
                      <ListItem>
                        Each violation report is documented, including evidence,
                        committee decisions, enforcement actions, and penalty
                        fee details.
                      </ListItem>
                      <ListItem>
                        Records are kept organized and easily accessible for
                        future reference in a secure system.
                      </ListItem>
                    </div>
                  )}
                </UnorderedList>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </div>
  )
}
