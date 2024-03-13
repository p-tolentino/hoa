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
import DisputeBylaws from './DisputeBylaws'
import React from 'react'

export default function DisputeResolution () {
  const processSteps = [
    {
      title: 'Dispute Form Submission',
      description:
        'Homeowners submit dispute reports through the Dispute Resolution module in the MIS.',
      details: [
        'Homeowners provide details about the dispute, including the type of dispute, date, and a detailed description of the dispute.',
        'Supporting evidence such as photos or documents may be attached to the dispute report.'
      ]
    },
    {
      title: 'Review by Grievance and Adjudication Committee',
      description:
        'The Grievance and Adjudication Committee receives and reviews the dispute report.',
      details: [
        'The Grievance and Adjudication Committee receives the dispute report in the MIS and assigns an officer-in-charge to oversee its resolution.',
        'The Officer-in-Charge contacts the involved parties regarding a scheduled meeting to discuss the ideal approach on how to resolve the dispute.'
      ]
    },
    {
      title: 'Dispute Resolution with Corrective Actions',
      description:
        'The Officer-in-Charge takes appropriate actions based on their decision, including issuing a penalty fee to violators if applicable.',
      details: [
        'The involved parties receive letters and notices outlining the nature of the dispute, required corrective actions, and a penalty fee.',
        'If applicable, the homeowner is informed that the penalty fee is added to their statement of account, which can be accessed via the Finance Management module.'
      ]
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
          Dispute Resolution
        </Text>
        {/* Section Description */}
        <Text fontSize='sm' fontFamily='font.body' color='grey'>
          You may click any step in the stepper to view its detailed
          description.
        </Text>
      </Box>
      <Flex gap={10}>
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
          <Card
            shadow='lg'
            mb='1rem'
            h='48vh'
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
              <Box fontFamily='font.body' fontSize='sm' textAlign='justify'>
                <Text>Details:</Text>
                <UnorderedList mb='1rem' ml={7}>
                  {processSteps[activeStep].details.map((detail, index) => (
                    <ListItem key={index}>{detail}</ListItem>
                  ))}
                </UnorderedList>

                {/* More Information */}
                {activeStep === 0 && (
                  <Text fontSize='xs' fontStyle='italic' color='grey'>
                    *A unique identifier or tracking number is assigned to the
                    dispute report for future reference. <br />
                    *Homeowners can view their dispute report submission in the{' '}
                    <Link
                      href='/admin/disputes/submitted-disputes'
                      color='blue.500'
                      textDecor='underline'
                    >
                      Submitted Dispute Reports
                    </Link>{' '}
                    in the Dispute Resolution module.
                    <br />
                    *The upcoming review process and potential follow-up actions
                    can also be accessed by clicking on the Resolution Progress
                    link in the submitted dispute report row.
                  </Text>
                )}
                {activeStep === 1 && (
                  <Text fontSize='xs' fontStyle='italic' color='grey'>
                    *The assigned Officer-In-Charge sends a digital meeting
                    letter containing meeting details to the involved parties.{' '}
                    <br />
                  </Text>
                )}
                {activeStep === 2 && (
                  <Text fontSize='xs' fontStyle='italic' color='grey'>
                    *Homeowners receive notifications on committee decisions and
                    required actions.
                    <br />
                    *If there is a violation invovled, the alleged violator/s
                    can access the procedure on how to{' '}
                    <Link
                      href='#rectifyDispute'
                      color='blue.500'
                      textDecor='underline'
                    >
                      rectify the dispute
                    </Link>{' '}
                    and{' '}
                    <Link
                      href='#payPenaltyFee'
                      color='blue.500'
                      textDecor='underline'
                    >
                      pay the penalty fee
                    </Link>{' '}
                    in the Violation Process Guide in the Violation Monitoring
                    module.
                  </Text>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Flex>
      <Box fontSize='sm' fontFamily='font.body' mt='1rem'>
        <Text>
          The HOA maintains a comprehensive record of dispute reports, actions
          taken, and penalty fees imposed.
        </Text>
        <UnorderedList ml={7}>
          <ListItem>
            Comprehensive records of dispute reports, actions taken, and penalty
            fees imposed are maintained.
            <ListItem>
              Each dispute report is documented, including evidence, committee
              decisions, enforcement actions, and penalty fee details.
            </ListItem>
            <ListItem>
              Records are kept organized and easily accessible for future
              reference in a secure system.
            </ListItem>
          </ListItem>
        </UnorderedList>
      </Box>
    </div>
  )
}
