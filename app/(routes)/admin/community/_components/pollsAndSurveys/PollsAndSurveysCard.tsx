"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, Flex, Spacer, HStack } from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import Post from "./_components/post";
import Create from "./_components/create";
import { useState } from "react";

import { Polls, User } from "@prisma/client";

interface PollProps {
  polls: Polls[];
  user: string;
}

export default function PollsAndSurveysCard({ polls, user }: PollProps) {
  const [selectedCategory, setSelectedCategory] = useState("showAll");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const filteredPolls = polls
    .filter(
      (poll) =>
        selectedCategory === "showAll" || poll.category === selectedCategory
    )
    .filter((poll) =>
      poll.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter(
      (poll) => selectedStatus === "All" || poll.status === selectedStatus
    );

  return (
    <>
      <Card className="h-[70vh]">
        <Flex justifyContent="space-between">
          <CardHeader>
            <CardTitle>Polls & Surveys</CardTitle>
            <CardDescription>
              View and answer polls and surveys posted by HOA Officers.
            </CardDescription>
          </CardHeader>
          <HStack p="20px">
            {/* Create Poll/Survey Button */}
            <Create />
          </HStack>
        </Flex>
        <CardContent className="space-y-2">
          <Flex justifyContent="space-between" mb="1%">
            <Input
              size="sm"
              w="35%"
              type="string"
              placeholder="Search by Poll or Survey Title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Spacer />
            <HStack>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="sm:w-40">
                  <SelectGroup>
                    <SelectItem value="All" className="font-semibold">
                      Status
                    </SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Select category to show */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Show All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="showAll" className="font-semibold">
                      Show All
                    </SelectItem>
                    <SelectItem value="MEETING">Meeting</SelectItem>
                    <SelectItem value="ELECTION">Election</SelectItem>
                    <SelectItem value="INQUIRY">Inquiry</SelectItem>
                    <SelectItem value="EVENT">Event</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </HStack>
          </Flex>

          {/* Wrap the PollPosts and SurveyPosts inside ScrollArea */}
          <ScrollArea
            style={{ maxHeight: "calc(70vh - 180px)", overflowY: "auto" }}
          >
            <Post polls={filteredPolls} user={user} />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
