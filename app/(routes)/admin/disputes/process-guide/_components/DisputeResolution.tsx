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
        'Homeowners provide details about the dispute, including the type of dispute, type of violation (if applicable), date, and a detailed description of the dispute.',
        'Supporting evidence such as photos or documents may be attached to the dispute report.'
      ]
    },
    {
      title: 'Review by Grievance and Adjudication Committee',
      description:
        'The Grievance and Adjudication Committee receives and reviews the dispute report.',
      details: [
        'The Grievance and Adjudication Committee receives the dispute report in the MIS and assigns an officer to oversee its resolution.',
        'Each person involved in the dispute receives a letter outlining the nature of the dispute and a scheduled meeting to deliberate on the most effective course of action for its resolution.',
        'Prior to the meeting date, the disputing parties are responsible to collect additional documents in support of their respective narratives.'
      ]
    },
    {
      title: 'Dispute Resolution with Corrective Actions',
      description:
        'The Officer assigned takes appropriate actions based on their decision, including issuing a penalty fee to violators if applicable.',
      details: [
        'At this step, it is reasonable to presume that the scheduled dispute resolution meeting has been conducted.',
        'If applicable, each person involved in the dispute is informed that the penalty fee is added to their statement of account, which can be accessed via the Finance Management module.'
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
                    *For the purpose of directing the resolution process more
                    effectively, the Officer reviews the HOA's rules and
                    regulations indicated in the <DisputeBylaws /> before the
                    scheduled meeting date. <br />
                    *The standard meeting date for disputes is the{' '}
                    <b>upcoming Saturday</b> for the disputing parties to have
                    the opportunity to gather necessary evidence to support
                    their claims. <br />
                    *A notice is issued to all persons involved in the dispute{' '}
                    <b>(1) day</b> prior to the scheduled meeting date.
                  </Text>
                )}
                {activeStep === 2 && (
                  <Text fontSize='xs' fontStyle='italic' color='grey'>
                    *If there is a violation involved, the corresponding penalty
                    fee is added to the dispute parties' statement of account
                    and they are duly notified. The alleged violator/s can
                    access the procedure on how to{' '}
                    <Link
                      href='#payPenaltyFee'
                      color='blue.500'
                      textDecor='underline'
                    >
                      pay the penalty fee
                    </Link>{' '}
                    in the Violation Process Guide in the Violation Enforcement
                    module.
                    <br />
                    <br />
                    <Text fontSize='xs' color='red.700'>
                      *In such cases where a dispute cannot be resolved through
                      amicable means with the involvement of the board of
                      directors, the dispute can be elevated to the barangay.
                    </Text>
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
          </ListItem>
          <ListItem>
            Each dispute report is documented, including evidence, committee
            decisions, enforcement actions, and penalty fee details.
          </ListItem>
          <ListItem>
            Records are kept organized and easily accessible for future
            reference in a secure system.
          </ListItem>
        </UnorderedList>
      </Box>
    </div>
  )
}
