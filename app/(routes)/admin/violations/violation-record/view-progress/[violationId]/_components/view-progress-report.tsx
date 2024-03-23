'use client'

import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import {
  Text,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Center
} from '@chakra-ui/react'
import { useState } from 'react'

export default function ViewProgressReport ({
  activityTitle
}: {
  activityTitle: string
}) {
  const [isOpen, setIsOpen] = useState(false) // Dialog open state

  const tempReport = {
    title: 'Progress Report Title',
    status: 'In Progress',
    dateReported: 'March 23, 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    subActivities: [
      {
        title: 'Sub-Activity Progress Report Title 1',
        dateReported: 'March 23, 2024',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Sub-Activity Progress Report Title 2',
        dateReported: 'March 23, 2024',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Sub-Activity Progress Report Title 3',
        dateReported: 'March 23, 2024',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Sub-Activity Progress Report Title 4',
        dateReported: 'March 23, 2024',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        title: 'Sub-Activity Progress Report Title 5',
        dateReported: 'March 23, 2024',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ]
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Link color='blue.500'>{activityTitle}</Link>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Badge
            className={cn(
              'w-[max-content] h-[min-content] px-3 py-1 text-center justify-center text-xs',
              tempReport.status === 'In Progress'
                ? 'bg-yellow-700'
                : tempReport.status === 'Pending'
                ? 'bg-red-800'
                : tempReport.status === 'Done'
                ? 'bg-green-700'
                : 'display-none'
            )}
          >
            {tempReport.status}
          </Badge>
          <Box>
            <DialogTitle>{activityTitle}</DialogTitle>
            <DialogDescription>Progress Report</DialogDescription>
          </Box>
        </DialogHeader>
        {/* Content for existing reports */}
        <Box fontSize='sm' fontFamily='font.body' mb='1rem'>
          <Box textAlign='justify'>
            <Text fontSize='md' fontWeight='semibold'>
              {tempReport.title}
            </Text>
            <Text fontSize='sm' color='grey'>
              Date reported: {tempReport.dateReported}
            </Text>
            <Text fontSize='xs' mt='0.5rem'>
              {tempReport.description}
            </Text>
          </Box>
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            mt='1.5rem'
            overflowY='auto'
            h='200px'
          >
            {tempReport.subActivities?.map((tempReport, index) => (
              <AccordionItem key={index}>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    <Text fontSize='sm' fontWeight='semibold'>
                      {tempReport.title}
                    </Text>
                    <Text fontSize='xs' color='grey'>
                      Date reported: {tempReport.dateReported}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel fontSize='xs' pb={4}>
                  {tempReport.description}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        {/* Content for no reports */}
        {/* <Center
          fontSize='sm'
          color='lightgray'
          fontFamily='font.body'
          py='2rem'
          mb='2rem'
        >
          No reports to show.
        </Center> */}
      </DialogContent>
    </Dialog>
  )
}
