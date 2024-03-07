"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { MonthlyEventList } from "./_components/MonthlyEventList";
import CreateEventButton from "./_components/CreateEventButton";
import EventDetails from "./_components/EventDetails";
import { Events, User } from "@prisma/client";

interface EventProps {
  events: Events[];
  user: string;
}

export default function EventsCard({ events, user }: EventProps) {
  return (
    <div>
      <Card className="h-[90vh]">
        <Flex justifyContent="space-between">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>View Community Calendar</CardDescription>
          </CardHeader>
          <HStack p="20px">
            {/* Create Event Button*/}
            <CreateEventButton user={user} />
          </HStack>
        </Flex>
        <CardContent className=" space-y-2 w-[58vw]">
          <MonthlyEventList events={events} user={user} />
          {/* <EventDetails /> */}
        </CardContent>
      </Card>
    </div>
  );
}
