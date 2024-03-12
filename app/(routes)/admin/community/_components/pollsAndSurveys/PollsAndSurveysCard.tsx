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

import Post from './_components/post'
import Create from './_components/create'
import { useState } from 'react'

import { Polls, User } from '@prisma/client'
import { getPersonalInfo } from "@/server/data/user-info";
import { useEffect } from "react";

interface PollProps {
  polls: Polls[]
  user: string
}

interface UserInfo {
  lastName: string | null;
  firstName: string | null;
  position: string | null;
}

interface UserInfos {
  [userId: string]: UserInfo | null;
}

export default function PollsAndSurveysCard ({ polls, user }: PollProps) {
  const [selectedCategory, setSelectedCategory] = useState('showAll')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchInput, setSearchInput] = useState('')

  const filteredPolls = polls
    .filter(
      poll =>
        selectedCategory === 'showAll' || poll.category === selectedCategory
    )
    .filter(poll =>
      poll.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter(poll => selectedStatus === 'All' || poll.status === selectedStatus)

    const [usersInfo, setUsersInfo] = useState<UserInfos>({});

    useEffect(() => {
      const fetchUserInfos = async () => {
        // Extract unique userIds from polls to avoid redundant fetches
        const uniqueUserIds = Array.from(
          new Set(polls.map((post) => post.userId))
        );
  
        // Fetch user info for each unique userId
        const userInfoPromises = uniqueUserIds.map(async (userId) => {
          const userInfo = await getPersonalInfo(userId);
          return { userId, userInfo };
        });
  
        // Resolve all promises and update state
        const userInfosArray = await Promise.all(userInfoPromises);
        const userInfosObj = userInfosArray.reduce<UserInfos>(
          (acc, { userId, userInfo }) => {
            acc[userId] = userInfo;
            return acc;
          },
          {}
        );
  
        setUsersInfo(userInfosObj);
      };
  
      fetchUserInfos();
    }, [polls]);

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
            {/* Create Poll/Survey Button */}
            <Create />
          </HStack>
        </Flex>
        <CardContent className='space-y-2'>
          <Flex justifyContent='space-between' mb='1%'>
            <Input
              size='sm'
              w='35%'
              type='string'
              placeholder='Search by Poll or Survey Title'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <Spacer />
            <HStack>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent className='sm:w-40'>
                  <SelectGroup>
                    <SelectItem value='All' className='font-semibold'>
                      Status
                    </SelectItem>
                    <SelectItem value='ACTIVE'>Active</SelectItem>
                    <SelectItem value='INACTIVE'>Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Select category to show */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Show All' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='showAll' className='font-semibold'>
                      Show All
                    </SelectItem>
                    <SelectItem value='MEETING'>Meeting</SelectItem>
                    <SelectItem value='ELECTION'>Election</SelectItem>
                    <SelectItem value='INQUIRY'>Inquiry</SelectItem>
                    <SelectItem value='EVENT'>Event</SelectItem>
                    <SelectItem value='OTHER'>Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </HStack>
          </Flex>

          {/* Wrap the PollPosts and SurveyPosts inside ScrollArea */}
          <ScrollArea
            style={{ maxHeight: 'calc(70vh - 180px)', overflowY: 'auto' }}
          >
            <Post polls={filteredPolls} user={user}  userInfos={usersInfo}/>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}
