"use client";

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import MembershipCard from "./_components/membership-card";
import FinanceCard from "./_components/finance-card";
import CommunityEngagmentCard from "./_components/comeng-card";
import DisputeCard from "./_components/dispute-card";
import ViolationCard from "./_components/violation-card";

import LineChart from "./_components/line-chart";
import DonutChart from "./_components/donut-chart";

export default function ExampleChart() {
  const title = "Dashboard";
  const description =
    "Explore the dashboard to gain insightful visualizations, enabling informed decision-making for your Homeowners Association.";
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <Button size="sm" colorScheme="gray" as={Link} href="/admin/disputes">
          Go Back
        </Button>
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Grid h="15%" templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%">
          <MembershipCard />
        </GridItem>
        <GridItem w="100%">
          <FinanceCard />
        </GridItem>
        <GridItem w="100%">
          <CommunityEngagmentCard />
        </GridItem>
        <GridItem w="100%">
          <DisputeCard />
        </GridItem>
        <GridItem w="100%">
          <ViolationCard />
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={2} alignSelf="center">
          <LineChart />
        </GridItem>
        <GridItem colSpan={2} alignSelf="center">
          <DonutChart />
        </GridItem>
      </Grid>
    </>
  );
}
