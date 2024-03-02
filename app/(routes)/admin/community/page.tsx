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
import { getPosts } from "@/server/data/posts";

const Community = async () => {

  const posts = await getPosts();
  if (!posts) {
    return null;
  }

  const filteredPosts =posts.filter(post => post.status==="ACTIVE")

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
      <Flex className='gap-10'></Flex>
      <Flex gap='2rem' w='80vw'>
        <Tabs defaultValue='discussions' className='w-[70vw]'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='discussions'>Discussions</TabsTrigger>
            <TabsTrigger value='business'>Business Forum</TabsTrigger>
            <TabsTrigger value='pollsAndSurveys'>Polls & Surveys</TabsTrigger>
            <TabsTrigger value='events'>Events</TabsTrigger>
          </TabsList>
          <TabsContent value='discussions'>
            <DiscussionsCard posts={filteredPosts} user={user.id}/>
          </TabsContent>
          <TabsContent value='business'>
            <BusinessForumCard />
          </TabsContent>
          <TabsContent value='pollsAndSurveys'>
            <PollsAndSurveysCard />
          </TabsContent>
          <TabsContent value='events'>
            <EventsCard />
          </TabsContent>
        </Tabs>
        <Flex flexDir='column' w='20vw' gap='2rem'>
          <AnnouncementBoard />
          <HomeownerResources />
          <AdminOfficerLinks />
        </Flex>
      </Flex>
    </>
  )
}

export default Community
