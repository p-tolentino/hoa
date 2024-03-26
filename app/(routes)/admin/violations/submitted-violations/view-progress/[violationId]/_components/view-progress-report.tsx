"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import {
  Text,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Center,
} from "@chakra-ui/react";
import { ViolationOfficerActivity, ViolationProgress } from "@prisma/client";
import { format } from "date-fns";
import { useState } from "react";

export default function ViewProgressReport({
  activity,
  progressReports,
}: {
  activity: ViolationOfficerActivity;
  progressReports: ViolationProgress[];
}) {
  const [isOpen, setIsOpen] = useState(false); // Dialog open state

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Link color="blue.500">{activity.title}</Link>
      </DialogTrigger>
      <DialogContent>
        {progressReports ? (
          <>
            <DialogHeader>
              <Badge
                className={cn(
                  "w-[max-content] h-[min-content] px-3 py-1 text-center justify-center text-xs",
                  !activity.isDone
                    ? "bg-yellow-700"
                    : activity.isDone
                    ? "bg-green-700"
                    : "display-none"
                )}
              >
                {activity.isDone ? "Done" : "In Progress"}
              </Badge>
              <Box>
                <DialogTitle>{activity.title}</DialogTitle>
                <DialogDescription>Progress Report</DialogDescription>
                <Text fontSize="sm" color="grey">
                  Date completed:{" "}
                  {activity.dateCompleted
                    ? format(
                        new Date(activity.dateCompleted)
                          ?.toISOString()
                          .split("T")[0],
                        "MMMM dd, yyyy"
                      )
                    : ""}
                </Text>
              </Box>
            </DialogHeader>
            {/* Content for existing reports */}
            <Box fontSize="sm" fontFamily="font.body" mb="1rem">
              {/* <Box textAlign="justify">
            <Text fontSize="md" fontWeight="semibold">
              {tempReport.title}
            </Text>
            <Text fontSize="sm" color="grey">
              Date reported: {tempReport.dateReported}
            </Text>
            <Text fontSize="xs" mt="0.5rem">
              {tempReport.description}
            </Text>
          </Box> */}
              <Accordion
                defaultIndex={[0]}
                allowMultiple
                mt="1.5rem"
                overflowY="auto"
                h="200px"
              >
                {progressReports?.map((report) => (
                  <AccordionItem key={report.id}>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="semibold">
                          {report.title}
                        </Text>
                        <Text fontSize="xs" color="grey">
                          Date reported:{" "}
                          {report.dateSubmitted
                            ? format(
                                new Date(report.dateSubmitted)
                                  ?.toISOString()
                                  .split("T")[0],
                                "MMMM dd, yyyy"
                              )
                            : ""}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel fontSize="xs" pb={4}>
                      {report.description}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          </>
        ) : (
          <Center
            fontSize="sm"
            color="lightgray"
            fontFamily="font.body"
            py="2rem"
            mb="2rem"
          >
            No reports to show.
          </Center>
        )}
      </DialogContent>
    </Dialog>
  );
}
