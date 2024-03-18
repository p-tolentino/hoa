import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Table, Tbody, Tr, Td, Center } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import EventDetails from './EventDetails'

import { Text } from '@chakra-ui/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format, getYear, getMonth } from 'date-fns'
import { Events, User } from '@prisma/client'

const getMonthYearFromIndex = (index: number) => {
  let year = getYear(new Date())

  return format(new Date(year, index, 1), 'LLLL RRRR')
}

interface EventProps {
  events: Events[]
  user: string
}

export function MonthlyEventList ({ events, user }: EventProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null)

  const handleEventClick = (event: Events) => {
    setSelectedEvent(event)
    onOpen()
  }

  const handleMonthEvents = (monthIndex: number) => {
    return events.filter(event => {
      const eventMonth = getMonth(new Date(event.date))
      return eventMonth === monthIndex
    })
  }

  return (
    <div className='px-10'>
      <Carousel>
        <CarouselContent className='pl-1 -ml-1'>
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index} className='pl-1 lg:basis-1/3'>
              <div className='p-1'>
                <Card className='h-[250px]'>
                  {/* Monthly Events */}
                  <CardContent className='p-6'>
                    <Text size='xl' fontWeight='semibold' mb='10px'>
                      {getMonthYearFromIndex(index)}
                    </Text>
                    {handleMonthEvents(index).length > 0 ? (
                      <ScrollArea className='h-[160px] rounded-md border'>
                        <Table size='sm' variant='striped'>
                          <Tbody>
                            {handleMonthEvents(index).map(
                              (event, eventIndex) => (
                                <Tr key={eventIndex}>
                                  <Td w='75px' fontWeight='semibold' pr='0'>
                                    {format(new Date(event.date), 'MMM dd')}
                                  </Td>
                                  <Td
                                    pl='5px'
                                    onClick={() => handleEventClick(event)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {event.title}
                                  </Td>
                                </Tr>
                              )
                            )}
                          </Tbody>
                        </Table>
                      </ScrollArea>
                    ) : (
                      // Scenario: No events to show for the month
                      <Center h='100px' color='grey'>
                        No events to show.
                      </Center>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {selectedEvent && (
        <EventDetails
          title={selectedEvent.title}
          date={format(new Date(selectedEvent.date), 'PPP')}
          venue={selectedEvent.venue}
          description={selectedEvent.description}
        />
      )}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {selectedEvent && (
            <EventDetails
              title={selectedEvent.title}
              date={format(new Date(selectedEvent.date), 'PPP')}
              venue={selectedEvent.venue}
              description={selectedEvent.description}
            />
          )}
        </ModalContent>
      </Modal> */}
    </div>
  )
}
