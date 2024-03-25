import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react'

import { currentUser } from '@/lib/auth'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DiscussionsCard from './_components/discussions/DiscussionsCard'
import AnnouncementBoard from './_components/sideCards/announcements/AnnouncementBoard'
import HomeownerResources from './_components/sideCards/homeownerResources/HomeownerResources'
import BusinessForumCard from './_components/business/BusinessForumCard'
import PollsAndSurveysCard from './_components/pollsAndSurveys/PollsAndSurveysCard'
import EventsCard from './_components/events/EventsCard'
import {
  getPosts,
  getDiscussionPosts,
  getBusinessPosts
} from '@/server/data/posts'
import { getPolls } from '@/server/data/polls'
import { getEvents } from '@/server/data/events'
import { getHoaInfo } from '@/server/data/hoa-info'
import { getAllPersonalInfo } from '@/server/data/user-info'

import { Polls, User } from '@prisma/client'
import { getPersonalInfo } from '@/server/data/user-info'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

interface PollProps {
  polls: Polls[]
  user: string
  // userInfos: UserInfos
}

interface UserInfo {
  lastName: string | null
  firstName: string | null
  position: string | null
}

interface UserInfos {
  [userId: string]: UserInfo | null
}

const Community = async () => {
  const discussion = await getDiscussionPosts()
  if (!discussion) {
    return null
  }

  const business = await getBusinessPosts()
  if (!business) {
    return null
  }

  const filteredPosts1 = discussion.filter(post => post.status === 'ACTIVE')
  const filteredPosts2 = business.filter(post => post.status === 'ACTIVE')

  const polls = await getPolls()
  if (!polls) {
    return null
  }

  const events = await getEvents()
  if (!events) {
    return null
  }

  const user = await currentUser()

  if (!user) {
    return null
  }

  const hoa = await getHoaInfo()

  if (!hoa) {
    return null
  }

  const personalInfo = await getAllPersonalInfo()
  if (!personalInfo) {
    return null
  }

  return (
    <>
      <Flex justifyContent='space-between'>
        <Box>
          <Heading
            title='Community Engagement'
            description='Navigate through the Community Engagement module'
          />
        </Box>
        <Box textAlign='right'>
          <Button
            as={Link}
            href='/admin/community/post-approvals'
            size='sm'
            colorScheme='yellow'
          >
            Posts for Appoval
          </Button>
          <Text fontSize='xs' color='darkgray' fontFamily='font.body'>
            For Admin and Officers only
          </Text>
        </Box>
      </Flex>
      <Separator className='mt-4 mb-6' />

      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing={5}
        mb={5}
        display={{ sm: 'grid', md: 'grid', lg: 'none' }}
      >
        <AnnouncementBoard
          personalInfo={personalInfo}
          events={events}
          user={user.id}
        />
        <HomeownerResources hoa={hoa} />
      </SimpleGrid>

      <Flex gap='2rem'>
        <Flex flexGrow={5}>
          <Tabs defaultValue='discussions' className='w-full'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='discussions'>Discussions</TabsTrigger>
              <TabsTrigger value='business'>Business Forum</TabsTrigger>
              <TabsTrigger value='pollsAndSurveys'>Polls & Surveys</TabsTrigger>
              <TabsTrigger value='events'>Events</TabsTrigger>
            </TabsList>
            <TabsContent value='discussions'>
              <DiscussionsCard posts={filteredPosts1} user={user.id} />
            </TabsContent>
            <TabsContent value='business'>
              <BusinessForumCard posts={filteredPosts2} user={user.id} />
            </TabsContent>
            <TabsContent value='pollsAndSurveys'>
              <PollsAndSurveysCard polls={polls} user={user.id} hoaInfo={hoa} />
            </TabsContent>
            <TabsContent value='events'>
              <EventsCard events={events} user={user.id} />
            </TabsContent>
          </Tabs>
        </Flex>
        <Flex
          flexDir='column'
          gap='2rem'
          flexGrow={1}
          display={{ sm: 'none', md: 'none', lg: 'flex' }}
        >
          <AnnouncementBoard
            personalInfo={personalInfo}
            events={events}
            user={user.id}
          />
          <HomeownerResources hoa={hoa} />
        </Flex>
      </Flex>
    </>
  )
}

export default Community
