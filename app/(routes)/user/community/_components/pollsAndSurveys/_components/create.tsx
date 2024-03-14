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
  Input,
  Stack,
  Box,
  HStack,
  Spacer,
  Divider,
  CheckboxGroup,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  FormHelperText,
  Icon
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format, addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'

function Create () {
  let [description, setDescription] = useState('')
  let [options, setOptions] = useState([''])
  let [questions, setQuestions] = useState([{ question: '', options: [''] }])

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20)
  })

  let handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputDescription = e.target.value
    setDescription(inputDescription)
  }

  let addQuestion = () => {
    setQuestions([...questions, { question: '', options: [''] }])
  }

  let removeQuestion = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(questionIndex, 1)
    setQuestions(newQuestions)
  }

  let addOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push('')
    setQuestions(newQuestions)
  }

  let removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.splice(optionIndex, 1)
    setQuestions(newQuestions)
  }

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon boxSize={3} mr='10px' />
          Create Poll / Survey
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>Create Poll / Survey</DialogTitle>
            <DialogDescription>Fill up the following fields.</DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                placeholder='Enter a Title'
              />
            </FormControl>

            {/* Duration */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Duration:
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    fontWeight='normal'
                    w='50%'
                  >
                    <Icon as={CalendarIcon} boxSize={4} mr={2} />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    initialFocus
                    mode='range'
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Description:
              </FormLabel>
              <Textarea
                placeholder='Write something...'
                id='description'
                fontSize='xs'
                maxH='300px'
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>

            {/* Select Category */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Category:
              </FormLabel>
              <CheckboxGroup size='sm' colorScheme='yellow'>
                <Stack spacing={5} direction='row' fontFamily='font.body'>
                  <Checkbox>Meeting</Checkbox>
                  <Checkbox>Election</Checkbox>
                  <Checkbox>Inquiry</Checkbox>
                  <Checkbox>Event</Checkbox>
                  <Checkbox>Other</Checkbox>
                </Stack>
              </CheckboxGroup>
              <FormHelperText fontSize='xs' m='1'>
                Select the categories that apply to your post for members to
                easily find it.
              </FormHelperText>
            </FormControl>
            <Divider />

            {/* Question */}
            <Box p='10px' maxH='300px' overflowY='auto'>
              <Stack spacing='15px'>
                {questions.map((question, index) => (
                  <FormControl key={index} isRequired mb='3%'>
                    <HStack>
                      <FormLabel fontSize='sm' fontWeight='semibold'>
                        Question:
                      </FormLabel>
                      <Spacer />
                      <Box alignSelf='center' ml='2%'>
                        {index === questions.length - 1 && (
                          <Button
                            size='xs'
                            colorScheme='yellow'
                            onClick={addQuestion}
                          >
                            Add Question
                          </Button>
                        )}
                        {questions.length > 1 && (
                          <Button
                            size='xs'
                            colorScheme='red'
                            onClick={() => removeQuestion(index)}
                            ml='2'
                          >
                            Remove
                          </Button>
                        )}
                      </Box>
                    </HStack>
                    <Input
                      size='sm'
                      type='string'
                      placeholder='Enter a Question'
                      value={question.question}
                      onChange={e => {
                        const newQuestions = [...questions]
                        newQuestions[index].question = e.target.value
                        setQuestions(newQuestions)
                      }}
                    />
                    <FormControl isRequired mt='1%'>
                      <FormLabel fontSize='sm' fontWeight='semibold' mb='0%'>
                        Options:
                      </FormLabel>
                      {question.options.map((option, optionIndex) => (
                        <HStack key={optionIndex}>
                          <Input
                            size='sm'
                            mt='1%'
                            type='string'
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={e => {
                              const newQuestions = [...questions]
                              newQuestions[index].options[optionIndex] =
                                e.target.value
                              setQuestions(newQuestions)
                            }}
                          />
                          {optionIndex > 0 && (
                            <Box alignSelf='center' ml='1%'>
                              <Button
                                size='xs'
                                w='20px'
                                colorScheme='red'
                                onClick={() => removeOption(index, optionIndex)}
                              >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          )}
                          {optionIndex === question.options.length - 1 && (
                            <Box alignSelf='center' ml='1%'>
                              <Button
                                size='xs'
                                w='20px'
                                onClick={() => addOption(index)}
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                          )}
                        </HStack>
                      ))}
                    </FormControl>
                  </FormControl>
                ))}
              </Stack>
            </Box>
          </Stack>

          <DialogFooter>
            <Button
              w='full'
              size='sm'
              colorScheme='yellow'
              type='submit'
              // onClick={() => onSubmit()}
            >
              Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default Create
