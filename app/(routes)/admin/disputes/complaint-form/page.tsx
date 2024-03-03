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

export default function FileComplaint () {
  const title = 'File a Complaint'
  const description =
    "Fill out the Complaint Form to formally request for a dispute resolution from the Homeowners' Association."

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
          {/* Complaint Title */}
          <FormControl isRequired>
            <FormLabel fontSize='md' fontFamily='font.body'>
              Title of Complaint
            </FormLabel>
            <Input w='50%' size='sm' type='string' fontWeight='semibold' />
          </FormControl>

          {/* Complaint Type */}
          <FormControl isRequired>
            <FormLabel fontSize='sm' fontWeight='semibold'>
              Complaint Type
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
                <Radio value='behavior'>Behavioral Issues</Radio>
                <Radio value='pet'>Pet-related Issues</Radio>
                <Radio value='other'>Other</Radio>
              </Stack>
            </RadioGroup>

            {/* Complaint */}
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize='md' fontFamily='font.body'>
              Complaint
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
              complaint.
            </FormHelperText>
          </FormControl>

          {/* Submit Button */}
          <Box textAlign='center'>
            <FormControl>
              <Button size='sm' type='submit' colorScheme='yellow' my='20px'>
                Submit Complaint
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
