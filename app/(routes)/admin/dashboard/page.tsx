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

import React, { useEffect, useState } from "react";

/* Card Functions */
import {
  getMemberCount,
  getHoaFunds,
  getViolations,
} from "@/server/data/dashboard";

/* Graph Fucntions */
import { getHoaTransactions, getAllViolations } from "@/server/data/dashboard";

/* Community Engagement */
import {
  getDiscussionCount,
  getBusinessCount,
  getEventCount,
  countUniqueUsersWhoAnsweredPolls,
} from "@/server/data/dashboard";

interface Transaction {
  dateIssued: Date | string; // Assuming dateIssued could be a Date object or a string
  type: "REVENUE" | "EXPENSE";
  amount: number;
}

interface MonthlySummary {
  yearMonth: string; // Make sure this is present and correctly typed
  income: number;
  expense: number;
  net: number; // Depending on how you calculate or handle 'net', ensure it's included and correctly typed
}

interface SummaryByMonth {
  [yearMonth: string]: MonthlySummary;
}

interface ViolationCounts {
  [key: string]: number;
}

interface ViolationChartData {
  series: number[];
  labels: string[];
}

export default function ExampleChart() {
  const [memberCount, setMemberCount] = useState(0);
  const [hoaFunds, setFunds] = useState(0);
  const [violationCount, setViolationCount] = useState(0);

  const [financialSummary, setFinancialSummary] = useState<MonthlySummary[]>(
    []
  );
  const [violationTypeCounts, setViolationTypeCounts] =
    useState<ViolationCounts>({});
  const [violationChartData, setViolationChartData] =
    useState<ViolationChartData>({ series: [], labels: [] });

  const [discussionCount, setDiscussionCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [userPollCount, setUserPollCount] = useState(0);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const fetchedCount = await getMemberCount();
        setMemberCount(fetchedCount);
        const fetchedFunds = await getHoaFunds();
        if (typeof fetchedFunds === "number") {
          // Check if fetchedFunds is a number
          setFunds(fetchedFunds);
        } else {
          // Handle the undefined case or set a default value
          setFunds(0); // Example: setting default value to 0
        }
        const violationCount = await getViolations();
        setViolationCount(violationCount);

        const transactions = await getHoaTransactions();
        const summary = calculateFinancialSummary(transactions);
        setFinancialSummary(summary);

        const fetchedViolations = await getAllViolations();
        if (fetchedViolations) {
          // Process to get counts by violation type
          const violationTypeCounts = fetchedViolations.reduce(
            (acc: ViolationCounts, violation) => {
              const { type } = violation;
              acc[type] = acc[type] ? acc[type] + 1 : 1;
              return acc;
            },
            {} as ViolationCounts
          );
          const labels = Object.keys(violationTypeCounts);
          const series = Object.values(violationTypeCounts);
          setViolationChartData({ series, labels });
          setViolationTypeCounts(violationTypeCounts);
        }

        const businessCount = await getBusinessCount();
        setBusinessCount(businessCount);

        const DiscussCount = await getDiscussionCount();
        setDiscussionCount(DiscussCount);

        const eventCount = await getEventCount();
        setEventCount(eventCount);

        const userPollCount = await countUniqueUsersWhoAnsweredPolls();
        setUserPollCount(userPollCount);
      } catch (error) {
        console.error("Failed to fetch member count:", error);
        // Handle the error appropriately in your application context
      }
    };
    fetchInfo();
  }, []);

  console.log(violationChartData);
  const calculateFinancialSummary = (
    transactions: Transaction[] | null
  ): MonthlySummary[] => {
    // If transactions is null, return an empty array immediately
    if (!transactions) {
      return [];
    }

    const summaryByMonth: SummaryByMonth = transactions.reduce(
      (acc: SummaryByMonth, transaction: Transaction) => {
        const date = new Date(transaction.dateIssued);
        const yearMonthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`; // Format: YYYY-MM

        // Initialize the month entry in accumulator if it doesn't exist
        if (!acc[yearMonthKey]) {
          acc[yearMonthKey] = {
            yearMonth: yearMonthKey,
            income: 0,
            expense: 0,
            net: 0,
          };
        }

        // Accumulate the amounts based on type
        if (transaction.type === "REVENUE") {
          acc[yearMonthKey].income += transaction.amount;
        } else if (transaction.type === "EXPENSE") {
          acc[yearMonthKey].expense += transaction.amount;
        }

        return acc;
      },
      {}
    ); // Providing an empty object as the initial value for the accumulator

    const financialSummary: MonthlySummary[] = Object.entries(
      summaryByMonth
    ).map(([yearMonth, { income, expense }]) => ({
      yearMonth,
      income,
      expense,
      net: income - expense,
    }));

    return financialSummary;
  };

  const title = "Dashboard";
  const description =
    "Explore the dashboard to gain insightful visualizations, enabling informed decision-making for your Homeowners Association.";
  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%">
          <MembershipCard count={memberCount} />
        </GridItem>
        <GridItem w="100%">
          <FinanceCard count={hoaFunds} />
        </GridItem>
        <GridItem w="100%">
          <DisputeCard count={0} />
        </GridItem>
        <GridItem w="100%">
          <ViolationCard count={violationCount} />
        </GridItem>
        <GridItem colSpan={1} rowSpan={2}>
          <Card>
            <CardHeader
              fontSize="sm"
              fontFamily="font.heading"
              fontWeight="semibold"
            >
              Community Engagement
            </CardHeader>
            <CardBody>
              <CommunityEngagmentCard
                discussCount={discussionCount}
                businessCount={businessCount}
                eventCount={eventCount}
                userPollCount={userPollCount}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <Card>
            <CardHeader
              fontSize="sm"
              fontFamily="font.heading"
              fontWeight="semibold"
            >
              Financial Summary: Revenue per Month
            </CardHeader>
            <CardBody>
              <LineChart financialSummary={financialSummary} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <Card>
            <CardHeader
              // mb="2.3%"
              fontSize="sm"
              fontFamily="font.heading"
              fontWeight="semibold"
            >
              Dispute Summary: Types of Dispute Reports
            </CardHeader>
            <CardBody>
              <DisputePieChart />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Card>
            <CardHeader
              fontSize="sm"
              fontFamily="font.heading"
              fontWeight="semibold"
            >
              Financial Summary: Income & Expenses per Month
            </CardHeader>
            <CardBody>
              <BarChart financialSummary={financialSummary} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2}>
          <Card>
            <CardHeader
              // mb="2.5%"
              fontSize="sm"
              fontFamily="font.heading"
              fontWeight="semibold"
            >
              Violation Summary: Types of Violation Reports
            </CardHeader>
            <CardBody>
              <ViolationPieChart
                series={violationChartData.series}
                labels={violationChartData.labels}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}
