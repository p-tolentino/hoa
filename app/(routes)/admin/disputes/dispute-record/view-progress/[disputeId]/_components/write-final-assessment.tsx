'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { useState } from 'react'

export default function WriteFinalAssessment () {
  const [isOpen, setIsOpen] = useState(false) // Dialog open state
  const [selectedOption, setSelectedOption] = useState('')

  const handleRadioChange = (value: string) => {
    setSelectedOption(value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          Write Final Assessment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Final Assessment</DialogTitle>
            <DialogDescription>
              Fill out the following fields as a guide to write the final
              assessment formulated by the committee for the dispute case.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='1.5rem'>
            <Stack>
              <Text fontSize='sm' fontFamily='font.body'>
                What is the committee's final verdict for this dispute case?
              </Text>
              <RadioGroup
                defaultValue=''
                size='sm'
                value={selectedOption}
                onChange={handleRadioChange}
              >
                <Stack
                  direction='column'
                  fontFamily='font.body'
                  textAlign='justify'
                >
                  <Box
                    pl='0.5rem'
                    bg={selectedOption === 'APPEALED' ? 'yellow.100' : ''}
                  >
                    <Radio value='APPEALED' colorScheme='yellow'>
                      The dispute case has been formally{' '}
                      <span className='font-bold'>APPEALED</span>. There will be
                      no imposition of penalty fees.
                    </Radio>
                  </Box>
                  <Box
                    pl='0.5rem'
                    bg={selectedOption === 'CONCLUDED' ? 'red.100' : ''}
                  >
                    <Radio value='CONCLUDED' colorScheme='red'>
                      The dispute case has been formally{' '}
                      <span className='font-bold'>CONCLUDED</span>. A{' '}
                      <span className='text-red-500 font-semibold'>
                        penalty fee
                      </span>{' '}
                      shall be imposed in accordance with the committee's
                      evaluation.
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </Stack>
            <Stack>
              <Textarea
                fontSize='sm'
                fontFamily='font.body'
                placeholder={
                  "Provide a brief summary of the committee's final assessment in this dispute case..."
                }
                height='30vh'
                resize='none'
              />
            </Stack>
          </Stack>
          <DialogFooter>
            <Button size='sm' colorScheme='yellow' type='submit'>
              Finish Assessment and Close Dispute Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
