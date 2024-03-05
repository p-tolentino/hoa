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

import { Text } from '@chakra-ui/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format, getYear } from 'date-fns'

const janEvents = [{ date: '', title: '' }]
const febEvents = [{ date: 'Feb 15', title: 'CAP-IS1 Consultation 1' }]
const marEvents = [
  { date: 'Mar 03', title: 'CAP-IS1 Consultation 2' },
  { date: 'Mar 22', title: "Kath's Birthday Celeb" }
]
const aprEvents = [
  { date: 'Apr 01', title: 'CAP-IS1 Submission of Defense Outputs' },
  { date: 'Apr 02', title: 'CAP-IS1 Project Defense (Start)' },
  { date: 'Apr 12', title: 'CAP-IS1 Project Defense (End)' },
  { date: 'Apr 18', title: 'CAP-IS1 Submission of Final Requirements' },
  { date: 'Apr 20', title: 'TERM BREAK' }
]
const mayEvents = [
  { date: 'May 03', title: "Diego's Birthday Celeb" },
  { date: 'May 14', title: "Maxine's Birthday Celeb" }
]
const junEvents = [{ date: '', title: '' }]
const julEvents = [{ date: '', title: '' }]
const augEvents = [{ date: 'Aug 01', title: "Pipoy's Birthday Celeb" }]
const sepEvents = [{ date: '', title: '' }]
const octEvents = [{ date: '', title: '' }]
const novEvents = [{ date: '', title: '' }]
const decEvents = [{ date: '', title: '' }]

const getMonthYearFromIndex = (index: number) => {
  let year = getYear(new Date())

  return format(new Date(year, index, 1), 'LLLL RRRR')
}

const handleMonthEvents = (index: number) => {
  switch (index) {
    case 1:
      return janEvents
    case 2:
      return febEvents
    case 3:
      return marEvents
    case 4:
      return aprEvents
    case 5:
      return mayEvents
    case 6:
      return junEvents
    case 7:
      return julEvents
    case 8:
      return augEvents
    case 9:
      return sepEvents
    case 10:
      return octEvents
    case 11:
      return novEvents
    case 12:
      return decEvents
    default:
      return []
  }
}

export function MonthlyEventList () {
  return (
    <div className='px-10'>
      <Carousel>
        <CarouselContent className='-mx-1'>
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index} className='pl-1 basis-1/3'>
              <div className='p-1'>
                <Card className='h-[250px]'>
                  {/* Monthly Events */}
                  <CardContent className='p-6'>
                    {/* Month and Year */}
                    <Text size='xl' fontWeight='semibold' mb='10px'>
                      {getMonthYearFromIndex(index)}
                    </Text>

                    {/* Monthly Events */}
                    {handleMonthEvents(index + 1).some(
                      event => event.date && event.title
                    ) ? (
                      <ScrollArea className='h-[160px] rounded-md border'>
                        <Table size='sm' variant='striped'>
                          <Tbody>
                            {handleMonthEvents(index + 1).map(event => (
                              <Tr key={index + 1}>
                                {/* Event Date */}
                                <Td w='75px' fontWeight='semibold' pr='0'>
                                  {event.date}
                                </Td>
                                {/* Event Title */}
                                <Td pl='5px'>{event.title}</Td>
                              </Tr>
                            ))}
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
    </div>
  )
}
