'use client'

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Box,
  Stack,
  RadioGroup,
  Radio
} from '@chakra-ui/react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { AddIcon } from '@chakra-ui/icons'

export default function ReportViolation () {
  const title = 'Report a Violation'
  const description =
    "Fill out the Violation Form to formally request a violation review from the Homeowners' Association."

  const [type, setType] = useState('')
  const [personsInvolved, setPersonsInvolved] = useState([''])

  const addPersonInput = () => {
    setPersonsInvolved([...personsInvolved, ''])
  }

  const handlePersonInputChange = (index: number, value: string) => {
    const updatedPersonsInvolved = [...personsInvolved]
    updatedPersonsInvolved[index] = value
    setPersonsInvolved(updatedPersonsInvolved)
  }

  return (
    <>
      <Heading title={title} description={description} />
      <Separator className='mt-4 mb-6' />

      <Box
        w='60%'
        border='1px'
        borderColor='gray.200'
        borderRadius='10px'
        mt='2%'
        p='20px'
      >
        <Stack spacing={5}>
          {/* Violation Title */}
          <FormControl isRequired>
            <FormLabel fontSize='md' fontFamily='font.body'>
              Title of Violation
            </FormLabel>
            <Input w='50%' size='sm' type='string' fontWeight='semibold' />
          </FormControl>

          {/* Violation Type */}
          <FormControl isRequired>
            <FormLabel fontSize='sm' fontWeight='semibold'>
              Violation Type
            </FormLabel>
            <RadioGroup
              size='sm'
              colorScheme='yellow'
              onChange={setType}
              value={type}
            >
              <Stack spacing={5} direction='row' fontFamily='font.body'>
                <Radio value='parking'>Parking</Radio>
                <Radio value='noise'>Noise and Nuisance</Radio>
                <Radio value='garbage'>Garbage Disposal</Radio>
                <Radio value='smoking'>Smoking</Radio>
                <Radio value='landscape'>Landscaping Issues</Radio>
                <Radio value='other'>Other</Radio>
              </Stack>
            </RadioGroup>

            {/* Violation */}
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='md' fontFamily='font.body'>
              Violation
            </FormLabel>
            <Textarea
              size='sm'
              placeholder='Tell us what happened...'
              h='200px'
              resize={'none'}
            />
          </FormControl>

          {/* Person/s Involved */}
          <FormControl isRequired>
            <FormLabel fontSize='md' fontFamily='font.body'>
              Person/s Involved
            </FormLabel>
            {personsInvolved.map((person, index) => (
              <Input
                key={index}
                size='sm'
                type='string'
                mb={2}
                value={person}
                onChange={e => handlePersonInputChange(index, e.target.value)}
              />
            ))}
            <Button size='xs' leftIcon={<AddIcon />} onClick={addPersonInput}>
              Add Person
            </Button>
            <FormHelperText fontSize='xs'>
              This will allow us to contact the individuals involved in the
              violation.
            </FormHelperText>
          </FormControl>

          {/* Submit Button */}
          <Box textAlign='center'>
            <FormControl>
              <Button size='sm' type='submit' colorScheme='yellow' my='20px'>
                Submit Violation
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
