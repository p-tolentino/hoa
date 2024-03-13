"use client";

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Stack,
  Text,
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
import DisputePieChart from "./_components/dispute-pie-chart";
import BarChart from "./_components/bar-chart";
import ViolationPieChart from "./_components/violation-pie-chart";

export default function ExampleChart() {
  const title = "Dashboard";
  const description =
    "Explore the dashboard to gain insightful visualizations, enabling informed decision-making for your Homeowners Association.";
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
      </Flex>
      <Separator className="mt-4 mb-6" />
      <Grid rowGap={6}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem w="100%">
            <MembershipCard />
          </GridItem>
          <GridItem w="100%">
            <FinanceCard />
          </GridItem>
          {/* <GridItem w="100%">
            <CommunityEngagmentCard />
          </GridItem> */}
          <GridItem w="100%">
            <DisputeCard />
          </GridItem>
          <GridItem w="100%">
            <ViolationCard />
          </GridItem>
          <GridItem colSpan={1} rowSpan={3}>
            <Card>
              <CardHeader
                mb="2.1%"
                fontSize="md"
                fontFamily="font.heading"
                fontWeight="semibold"
              >
                Total Events per Annum
              </CardHeader>
              <CardBody>
                <CommunityEngagmentCard />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <CardHeader
                fontSize="md"
                fontFamily="font.heading"
                fontWeight="semibold"
              >
                Total Revenue per Month
              </CardHeader>
              <CardBody>
                <LineChart />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <CardHeader
                mb="2.1%"
                fontSize="md"
                fontFamily="font.heading"
                fontWeight="semibold"
              >
                Dispute Reports per Annum
              </CardHeader>
              <CardBody>
                <DisputePieChart />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <CardHeader
                fontSize="md"
                fontFamily="font.heading"
                fontWeight="semibold"
              >
                Income and Expense per Quarter
              </CardHeader>
              <CardBody>
                <BarChart />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <CardHeader
                mb="6%"
                fontSize="md"
                fontFamily="font.heading"
                fontWeight="semibold"
              >
                Violation Reports per Annum
              </CardHeader>
              <CardBody>
                <ViolationPieChart />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Grid>
    </>
  );
}
