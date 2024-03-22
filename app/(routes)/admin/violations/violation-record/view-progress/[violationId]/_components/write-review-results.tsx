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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Box
} from '@chakra-ui/react'
import { useState } from 'react'

export default function WriteReviewResults () {
  const [isOpen, setIsOpen] = useState(false) // Dialog open state
  const [selectedOption, setSelectedOption] = useState('')
  const [keyActivities, setKeyActivities] = useState([
    { activity: '', dueDate: '' }
  ])

  const handleRadioChange = (value: string) => {
    setSelectedOption(value)
  }

  const handleAddRow = () => {
    setKeyActivities([...keyActivities, { activity: '', dueDate: '' }])
  }

  const handleRemoveRow = (index: number) => {
    const updatedActivities = [...keyActivities]
    updatedActivities.splice(index, 1)
    setKeyActivities(updatedActivities)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          Write Case Review Results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Write Case Review Results</DialogTitle>
            <DialogDescription>
              Fill out the following fields as a guide to write the case review
              results formulated by the committee.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='1.5rem'>
            <Stack>
              <Text fontSize='sm' fontFamily='font.body'>
                What is the committee's verdict in this violation case?
              </Text>
              <RadioGroup
                defaultValue=''
                size='sm'
                colorScheme='yellow'
                ml='0.5rem'
                value={selectedOption}
                onChange={handleRadioChange}
              >
                <Stack direction='column' fontFamily='font.body'>
                  <Radio value='VALID'>
                    The violation case is{' '}
                    <span className='font-bold'>VALID</span> and requires
                    immediate actions.
                  </Radio>
                  <Radio value='INVALID'>
                    The violation case is{' '}
                    <span className='font-bold'>INVALID</span> due to the lack
                    of sufficient evidence.
                  </Radio>
                </Stack>
              </RadioGroup>
            </Stack>

            {/* when VALID option is clicked */}
            {selectedOption === 'VALID' && (
              <Stack spacing={5} mt='0.5rem'>
                <FormControl isRequired>
                  <Stack spacing={2}>
                    <Box>
                      <FormLabel fontSize='sm' fontWeight='semibold' mb='0'>
                        Assign Officer
                      </FormLabel>
                      <Text fontSize='sm' fontFamily='font.body'>
                        Please select a Environment and Security Officer to
                        oversee the resolution of this violation case.
                      </Text>
                    </Box>
                    <Select>
                      <SelectTrigger className='w-[100%]'>
                        <SelectValue placeholder='Select an officer' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='e&s1'>
                            E&S1 Lastname, Firstname
                          </SelectItem>
                          <SelectItem value='e&s2'>
                            E&S2 Lastname, Firstname
                          </SelectItem>
                          <SelectItem value='e&s3'>
                            E&S3 Lastname, Firstname
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Stack>
                </FormControl>
                <FormControl isRequired>
                  <Stack spacing={2}>
                    <Box>
                      <FormLabel fontSize='sm' fontWeight='semibold' mb='0'>
                        Key Activities and Due Dates
                      </FormLabel>
                      <Text fontSize='sm' fontFamily='font.body'>
                        Please enter the key activities and its corresponding
                        due dates to enforce immediate actions for this
                        violation case.
                      </Text>
                    </Box>
                    <TableContainer
                      mx='1rem'
                      mt='0.5rem'
                      overflowY='auto'
                      h='120px'
                    >
                      <Table size='xs' variant='simple' fontFamily='font.body'>
                        <Thead>
                          <Tr>
                            <Th fontSize='xs' fontFamily='font.body' w='full'>
                              Activity
                            </Th>
                            <Th fontSize='xs' fontFamily='font.body'>
                              Due Date
                            </Th>
                            <Th px='10px'>
                              {/* Add Row Button */}
                              <Button
                                size='xs'
                                colorScheme='yellow'
                                onClick={handleAddRow}
                              >
                                <AddIcon />
                              </Button>
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody fontSize='sm' fontFamily='font.body'>
                          {keyActivities.map((activity, index) => (
                            <Tr key={index}>
                              {/* Activity Input */}
                              <Td>
                                <Input
                                  type='text'
                                  fontSize='sm'
                                  w='95%'
                                  value={activity.activity}
                                  onChange={e => {
                                    const updatedActivities = [...keyActivities]
                                    updatedActivities[index].activity =
                                      e.target.value
                                    setKeyActivities(updatedActivities)
                                  }}
                                />
                              </Td>
                              {/* Due Date Input */}
                              <Td>
                                <Input
                                  type='date'
                                  fontSize='sm'
                                  value={activity.dueDate}
                                  onChange={e => {
                                    const updatedActivities = [...keyActivities]
                                    updatedActivities[index].dueDate =
                                      e.target.value
                                    setKeyActivities(updatedActivities)
                                  }}
                                />
                              </Td>
                              {/* Delete Button */}
                              {index > 0 && (
                                <Td textAlign='center'>
                                  <Button
                                    size='xs'
                                    colorScheme='red'
                                    onClick={() => handleRemoveRow(index)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Td>
                              )}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </FormControl>
              </Stack>
            )}

            {/* when INVALID option is clicked */}
            {selectedOption === 'INVALID' && (
              <Stack>
                <Textarea
                  fontSize='sm'
                  fontFamily='font.body'
                  placeholder='Provide a brief explanation for the invalidity of this violation case to the homeowner who filed the report...'
                  height='30vh'
                  resize='none'
                />
              </Stack>
            )}
          </Stack>
          <DialogFooter>
            {/* FINISH REVIEW: when INVALID option is clicked */}
            {selectedOption === 'VALID' && (
              <Button size='sm' colorScheme='yellow' type='submit'>
                Finish Review
              </Button>
            )}
            {/* CLOSE VIOLATION CASE: when INVALID option is clicked */}
            {selectedOption === 'INVALID' && (
              <Button size='sm' colorScheme='red' type='submit'>
                Close Violation Case
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
