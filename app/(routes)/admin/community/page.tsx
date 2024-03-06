import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Flex } from '@chakra-ui/react'

import { currentUser } from "@/lib/auth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DiscussionsCard from './_components/discussions/DiscussionsCard'
import AnnouncementBoard from './_components/sideCards/announcements/AnnouncementBoard'
import HomeownerResources from './_components/sideCards/homeownerResources/HomeownerResources'
import AdminOfficerLinks from './_components/sideCards/adminOfficerLinks/AdminOfficerLinks'
import BusinessForumCard from './_components/business/BusinessForumCard'
import PollsAndSurveysCard from './_components/pollsAndSurveys/PollsAndSurveysCard'
import EventsCard from './_components/events/EventsCard'
import { getPosts, getDiscussionPosts, getBusinessPosts } from "@/server/data/posts";
import { getPolls } from "@/server/data/polls";
import { getEvents } from "@/server/data/events";

const Community = async () => {

  const discussion = await getDiscussionPosts();
  if (!discussion) {
    return null;
  }

  const business = await getBusinessPosts();
  if (!business) {
    return null;
  }

  const filteredPosts1 =discussion.filter(post => post.status==="ACTIVE")
  const filteredPosts2 =business.filter(post => post.status==="ACTIVE")

  
  const polls = await getPolls();
  if (!polls) {
    return null;
  }

  const events = await getEvents();
  if (!events) {
    return null;
  }
  
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <Heading
        title='Community Engagement'
        description='Navigate through the Community Engagement module'
      />
      <Separator className='mt-4 mb-6' />
      <Flex gap='2rem' w='78vw'>
        <Tabs defaultValue='discussions' className='w-[70vw]'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='discussions'>Discussions</TabsTrigger>
            <TabsTrigger value='business'>Business Forum</TabsTrigger>
            <TabsTrigger value='pollsAndSurveys'>Polls & Surveys</TabsTrigger>
            <TabsTrigger value='events'>Events</TabsTrigger>
          </TabsList>
          <TabsContent value='discussions'>
            <DiscussionsCard posts={filteredPosts1} user={user.id}/>
          </TabsContent>
          <TabsContent value='business'>
            <BusinessForumCard posts={filteredPosts2} user={user.id}/>
          </TabsContent>
          <TabsContent value='pollsAndSurveys'>
            <PollsAndSurveysCard polls={polls} user={user.id}/>
          </TabsContent>
          <TabsContent value='events'>
            <EventsCard events={events} user={user.id}/>
          </TabsContent>
        </Tabs>
        <Flex flexDir='column' gap='2rem'>
          <AnnouncementBoard />
          <HomeownerResources />
          <AdminOfficerLinks />
        </Flex>
      </Flex>
    </>
  )
}

export default Community
