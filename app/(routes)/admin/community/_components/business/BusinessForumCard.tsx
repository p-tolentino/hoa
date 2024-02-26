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

import BusinessPost from './_components/BusinessPost'
import CreateBusinessPostButton from './_components/CreateBusinessPostButton'

export default function BusinessForumCard () {
  return (
    <>
      <Card className='h-[70vh]'>
        <Flex justifyContent='space-between'>
          <CardHeader>
            <CardTitle>Business Forum</CardTitle>
            <CardDescription>
              Promote your business and view the businesses of Homeowners.
            </CardDescription>
          </CardHeader>
          <HStack p='20px'>
            {/* Create BusinessPost Button*/}
            <CreateBusinessPostButton />
          </HStack>
        </Flex>
        <CardContent className='space-y-2'>
          <Flex justifyContent='space-between' mb='1%'>
            <Input
              size='sm'
              w='30%'
              type='string'
              placeholder='Search by Business Title'
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
                  <SelectItem value='addedCategory'>Added Category</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Flex>

          {/* Wrap the PollPosts and SurveyPosts inside ScrollArea */}
          <ScrollArea
            style={{ maxHeight: 'calc(65vh - 120px)', overflowY: 'auto' }}
          >
            <BusinessPost />
            <BusinessPost />
            <BusinessPost />
            <BusinessPost />
            <BusinessPost />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}
