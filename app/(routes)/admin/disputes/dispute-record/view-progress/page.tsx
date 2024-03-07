'use client'

import {
  Flex,
  Button,
  Step,
  Box,
  Text,
  Progress,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps
} from '@chakra-ui/react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const steps = [
  { title: '1', description: 'Submit Dispute Form' },
  { title: '2', description: 'Upload Supporting Documents' },
  { title: '3', description: 'Step Three' },
  { title: '4', description: 'Step Four' },
  { title: '5', description: 'Step Five' },
  { title: '6', description: 'Step Six' }
]

export default function ViewProgress () {
  const title = 'Dispute Resolution Progress'
  const description =
    'View the progress of your submitted dispute form in the Homeowners Association'

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length
  })

  const activeStepText = steps[activeStep].description

  const max = steps.length - 1
  const progressPercent = (activeStep / max) * 100

  return (
    <>
      <Flex justifyContent='space-between'>
        <Heading title={title} description={description} />
        <Button
          size='sm'
          colorScheme='gray'
          as={Link}
          href='/admin/disputes/dispute-record'
        >
          Go Back
        </Button>
      </Flex>
      <Separator className='mt-4 mb-6' />

      <Box position='relative'>
        <Stepper index={activeStep} size='sm' gap='0' colorScheme='yellow'>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator bg='white'>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              {/* <Box flexShrink="0" fontSize="xs">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator /> */}
            </Step>
          ))}
        </Stepper>
        <Progress
          value={progressPercent}
          position='absolute'
          height='3px'
          width='full'
          top='10px'
          zIndex={-1}
          colorScheme='yellow'
        />
      </Box>

      <Box
        w='100%'
        h='75vh'
        border='1px'
        borderColor='gray.200'
        borderRadius='10px'
        mt='2%'
        p='20px'
        overflowY='auto'
      >
        {steps.map((step, index) => (
          <Text key={index} display={index === activeStep ? 'block' : 'none'}>
            {`Step ${step.title}: ${step.description}`}
          </Text>
        ))}
      </Box>
    </>
  )
}
