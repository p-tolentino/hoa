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
import { useState } from 'react';

import DiscussionPost from './_components/DiscussionPost'
import CreateDiscussionPostButton from './_components/CreateDiscussionPostButton'
import { getPosts } from "@/server/data/posts";
import { Post, User } from "@prisma/client";

interface PostProps {
  posts: Post[];
  user: string;
}

export default function DiscussionsCard({ posts, user }: PostProps) {

  const [selectedCategory, setSelectedCategory] = useState('showAll');
  const [searchInput, setSearchInput] = useState('');

  const filteredPosts = posts
  .filter(post => selectedCategory === 'showAll' || post.category === selectedCategory)
  .filter(post => post.title.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <>
      <Card className='h-[75vh]'>
        <Flex justifyContent='space-between'>
          <CardHeader>
            <CardTitle>Discussions</CardTitle>
            <CardDescription>
              Create, view, and participating in discussions of Homeowners.
            </CardDescription>
          </CardHeader>
          <HStack p='20px'>
            {/* Create Discussion Post Button*/}
            <CreateDiscussionPostButton />
          </HStack>
        </Flex>
        <CardContent className='space-y-2'>
          <Flex justifyContent='space-between' mb='1%'>
            <Input
              size='sm'
              w='30%'
              type='string'
              placeholder='Search by Discussion Title'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Spacer />
            {/* Select category to show */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}
            >
              <SelectTrigger className='w-[250px]'>
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
          </Flex>

          {/* Wrap the PollPosts and SurveyPosts inside ScrollArea */}
          <ScrollArea
            style={{ maxHeight: 'calc(70vh - 120px)', overflowY: 'auto' }}
          >
            <DiscussionPost posts={filteredPosts} user={user}/>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  )
}
