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
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Select,
  Icon
} from '@chakra-ui/react'
import { format } from 'date-fns'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'

export default function CreateEventButton () {
  const action = 'Create Event'
  const action_description = 'Fill up the following fields to create an event.'

  const [venueType, setVenueType] = useState('hoaFacilities')
  const [date, setDate] = useState<Date>()

  let [eventDescription, setEventDescription] = useState('')

  let handleEventDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let inputEventDescription = e.target.value
    setEventDescription(inputEventDescription)
  }

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon mr='10px' />
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <form action=''>
          <DialogHeader>
            <DialogTitle>{action}</DialogTitle>
            <DialogDescription>{action_description}</DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            {/* Event Title */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Event Title:
              </FormLabel>
              <Input size='md' fontWeight='semibold' type='string' />
            </FormControl>

            {/* Event Date */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Date:
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
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            {/* Venue */}
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Venue:
              </FormLabel>
              <FormHelperText fontSize='xs' mb='5px'>
                Please select the type of venue to view its possible options.
              </FormHelperText>
              <RadioGroup
                size='sm'
                colorScheme='yellow'
                onChange={setVenueType}
                value={venueType}
              >
                <Stack spacing={5} direction='row' fontFamily='font.body'>
                  <Radio value='hoaFacilities'>HOA Facilities</Radio>
                  <Radio value='homeAddress'>Your Home Address</Radio>
                  <Radio value='otherVenue'>Other Venue</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              {venueType === 'hoaFacilities' && (
                <Select placeholder='Select facility' size='sm'>
                  <option value='basketballCourt'>Basketball Court</option>
                  <option value='swimmingPool'>Swimming Pool</option>
                  <option value='clubnouse'>Clubhouse</option>
                </Select>
              )}
              {venueType === 'homeAddress' && (
                <Input
                  type='string'
                  size='sm'
                  value='#123 Apple Street'
                  disabled
                />
              )}
              {venueType === 'otherVenue' && (
                <Input
                  type='string'
                  size='sm'
                  placeholder='Enter name of venue'
                />
              )}
            </FormControl>

            {/* Event Description */}
            <Box py='10px'>
              <FormControl isRequired>
                <FormLabel fontSize='sm' fontWeight='semibold'>
                  Event Description
                </FormLabel>
                <Textarea
                  placeholder='Write something...'
                  id='discussionPost'
                  fontSize='xs'
                  maxH='300px'
                  value={eventDescription}
                  onChange={handleEventDescriptionChange}
                />
              </FormControl>
            </Box>
          </Stack>
          <DialogFooter>
            {/* Post Event Button */}
            <Button
              size='sm'
              colorScheme='yellow'
              type='submit'
              // onClick={() => onSubmit()}
            >
              Post Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
