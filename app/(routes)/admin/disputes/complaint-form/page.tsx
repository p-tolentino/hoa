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
  Radio,
  HStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

export default function FileComplaint () {
  const title = 'File a Complaint'
  const description =
    "Fill out the Complaint Form to formally request for a dispute resolution from the Homeowners' Association."

  const disputeTypes = [
    {
      value: 'neighbor',
      name: 'Neighbor-to-Neighbor Disputes'
    },
    {
      value: 'lease',
      name: 'Lease Restrictions'
    },
    {
      value: 'maintenance',
      name: 'Common Area Maintenance Issues'
    },
    {
      value: 'rules',
      name: 'Rule Enforcement and Fines'
    },
    {
      value: 'board',
      name: 'Board Decisions and Elections'
    }
  ]

  const [type, setType] = useState('')
  const [personsInvolved, setPersonsInvolved] = useState([''])

  const addPersonInput = () => {
    setPersonsInvolved([...personsInvolved, ''])
  }

  const removePersonInput = (index: number) => {
    const updatedPersonsInvolved = [...personsInvolved]
    updatedPersonsInvolved.splice(index, 1)
    setPersonsInvolved(updatedPersonsInvolved)
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
        w='80%'
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
            <Input
              w='50%'
              size='sm'
              type='string'
              fontWeight='semibold'
              placeholder='Enter a Title'
            />
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
                {disputeTypes.map((dispute, index) => (
                  <Radio key={index} value={dispute.value}>
                    {dispute.name}
                  </Radio>
                ))}
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
              fontFamily='font.body'
              resize={'none'}
            />
          </FormControl>

          {/* Person/s Involved */}
          <FormControl isRequired>
            <HStack justifyContent='space-between'>
              <FormLabel fontSize='md' fontFamily='font.body'>
                Person/s Involved
              </FormLabel>
              <Button
                size='xs'
                mt='-1'
                leftIcon={<AddIcon />}
                onClick={addPersonInput}
              >
                Add Person
              </Button>
            </HStack>
            {personsInvolved.map((person, index) => (
              <Box key={index} display='flex' alignItems='center'>
                <Input
                  key={index}
                  size='sm'
                  type='string'
                  placeholder='Enter a Name'
                  mb={2}
                  value={person}
                  onChange={e => handlePersonInputChange(index, e.target.value)}
                />
                {personsInvolved.length > 1 && index !== 0 && (
                  <Button
                    size='xs'
                    colorScheme='red'
                    ml={2}
                    onClick={() => removePersonInput(index)}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}
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
