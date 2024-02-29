'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input, Flex, Spacer, HStack } from '@chakra-ui/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import React from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'

import PollPosts from './_posts/poll'
import SurveyPosts from './_posts/survey'
import CreatePoll from './_create/polls'
import CreateSurvey from './_create/surveys'

export default function PollsAndSurveysCard () {
  return (
    <>
      <Card className='h-[75vh]'>
        <Flex justifyContent='space-between'>
          <CardHeader>
            <CardTitle>Polls & Surveys</CardTitle>
            <CardDescription>
              View and answer polls and surveys posted by HOA Officers.
            </CardDescription>
          </CardHeader>
          <HStack p='20px'>
            {/* Create Poll Button*/}
            <CreatePoll />
            {/* Create Survey Button */}
            <CreateSurvey />
          </HStack>
        </Flex>
        <CardContent className='space-y-2'>
          <Flex justifyContent='space-between' mb='1%'>
            <Input
              size='sm'
              w='30%'
              type='string'
              placeholder='Search by Poll or Survey Title'
            />
            <Spacer />
            {/* Select category to show */}
            <Select /*value={selectedCategoryFilter} onValueChange={(value) => setSelectedCategoryFilter(value)}*/
            >
              <SelectTrigger className='w-[250px]'>
                <SelectValue placeholder='Show All' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='showAll' className='font-semibold'>
                    Show All
                  </SelectItem>
                  <SelectItem value='meeting'>Meeting</SelectItem>
                  <SelectItem value='election'>Election</SelectItem>
                  <SelectItem value='inquiry'>Inquiry</SelectItem>
                  <SelectItem value='event'>Event</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Flex>

          {/* Wrap the PollPosts and SurveyPosts inside ScrollArea */}
          <ScrollArea
            style={{ maxHeight: 'calc(70vh - 120px)', overflowY: 'auto' }}
          >
            <PollPosts />
            <SurveyPosts />
            <PollPosts />
            <SurveyPosts />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}
