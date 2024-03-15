"use client";

import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Card,
  CardBody,
  Box,
  Flex,
  Text,
  UnorderedList,
  ListItem,
  CardHeader,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { PersonalInfo } from "@prisma/client";
import { format } from "date-fns";

interface ViewProgressProps {
  reportDetails: any;
}

export const ViewProgress: React.FC<ViewProgressProps> = ({
  reportDetails,
}) => {
  const processSteps = [
    {
      title: "Dispute Form Submission",
      description:
        "Homeowners submit dispute reports through the Dispute Resolution module in the MIS.",
      details: [
        "Homeowners provide details about the dispute, including the type of dispute, date, and a detailed description of the dispute.",
        "Supporting evidence such as photos or documents may be attached to the dispute report.",
      ],
    },
    {
      title: "Review by Grievance and Adjudication Committee",
      description:
        "The Grievance and Adjudication Committee receives and reviews the dispute report.",
      details: [
        "The Grievance and Adjudication Committee receives the dispute report in the MIS and assigns an officer-in-charge to oversee its resolution.",
        "The Officer-in-Charge contacts the involved parties regarding a scheduled meeting to discuss the ideal approach on how to resolve the dispute.",
      ],
    },
    {
      title: "Dispute Resolution with Corrective Actions",
      description:
        "The Officer-in-Charge takes appropriate actions based on their decision, including issuing a penalty fee to violators if applicable.",
      details: [
        "The involved parties receive letters and notices outlining the nature of the dispute, required corrective actions, and a penalty fee.",
        "If applicable, the homeowner is informed that the penalty fee is added to their statement of account, which can be accessed via the Finance Management module.",
      ],
    },
  ];

  // Temporary Data
  const temp = {
    id: "#D002",
    number: 2,
    status: "Under Review",
    createdAt: "March 01, 2024",
    officerAssigned: "G&A Officer 2",
    disputeDate: "MM/DD/YYYY",
    type: "Neighbor-to-Neighbor Conflict",
    description: "Lorem ipsum",
    violation: {
      type: "Parking",
      penaltyFee: "500",
    },
    personsInvolved: [""],
    submittedBy: "Juan Dela Cruz",
    step: 2,
    progress: "Step 2: Review by Grievance and Adjudication Committee",
  };

  const { activeStep, setActiveStep } = useSteps({
    index: reportDetails.dispute.step - 1,
    count: processSteps.length,
  });

  return (
    <div>
      <Flex justifyContent="space-between">
        <Flex className="gap-x-4">
          <Heading
            title={`#D${reportDetails.dispute.number
              .toString()
              .padStart(4, "0")} - Dispute Resolution Progress`}
            description="View the progress of a selected dispute case within the Homeowners' Association."
          />
          <Badge
            className={cn(
              "w-[max-content] h-[min-content] px-3 py-2 text-center justify-center text-sm",
              reportDetails.dispute.status === "Resolved"
                ? "bg-green-700"
                : reportDetails.dispute.status === "Pending"
                ? "bg-red-700"
                : reportDetails.dispute.status === "Under Review"
                ? "bg-yellow-600"
                : reportDetails.dispute.status === "Unresolved"
                ? "bg-gray-300 text-black"
                : "display-none"
            )}
          >
            {reportDetails.dispute.status}
          </Badge>
        </Flex>
        <Button as={Link} href="/admin/disputes/submitted-disputes" size="sm">
          Go Back
        </Button>
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Flex gap={10} h="65vh">
        <Stepper
          index={activeStep}
          orientation="vertical"
          width="min-content"
          gap="0"
          colorScheme="yellow"
          size="md"
          h="40vh"
        >
          {processSteps.map((step, index) => (
            <Step
              key={index}
              onClick={() => {
                if (index <= reportDetails.dispute.step - 1)
                  // to make uncompleted steps unclickable
                  setActiveStep(index);
              }}
            >
              <StepIndicator
                className={
                  index <= reportDetails.dispute.step - 1
                    ? "text-black"
                    : "text-gray-300"
                }
              >
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box
                flexShrink="0"
                fontFamily="font.body"
                w="10vw"
                onClick={() => Request}
              >
                {/* Stepper Number and Title */}
                <StepTitle>
                  <span
                    className={
                      index <= reportDetails.dispute.step - 1
                        ? "text-black"
                        : "text-gray-300"
                    }
                  >
                    Step {index + 1}
                  </span>
                </StepTitle>
                <StepDescription>
                  <span
                    className={
                      index <= reportDetails.dispute.step - 1
                        ? "text-black"
                        : "text-gray-300"
                    }
                  >
                    {step.title}
                  </span>
                </StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box w="100%">
          <Card
            shadow="lg"
            mb="1rem"
            h="65vh"
            p="20px 20px 30px 20px"
            overflowY="auto"
          >
            <CardHeader pb={0}>
              <Text
                fontSize="sm"
                fontFamily="font.body"
                color="brand.500"
                fontWeight="bold"
              >
                Step {activeStep + 1}
              </Text>
              <Text fontSize="lg" fontFamily="font.heading" fontWeight="bold">
                {/* Step Title */}
                {processSteps[activeStep].title}
              </Text>
              <Text fontFamily="font.body" textAlign="justify">
                {/* Step Description */}
                {processSteps[activeStep].description}
              </Text>
            </CardHeader>
            <Card />
            <CardBody>
              <Stack spacing={5}>
                {/* Step Details */}
                <Box fontFamily="font.body" fontSize="sm" textAlign="justify">
                  <Text>Details:</Text>
                  <UnorderedList ml={7}>
                    {processSteps[activeStep].details.map((detail, index) => (
                      <ListItem key={index}>{detail}</ListItem>
                    ))}
                  </UnorderedList>
                </Box>

                {/* INFORMATION TABLES */}
                <Flex gap={5}>
                  <TableContainer>
                    <Table
                      variant="unstyled"
                      fontFamily="font.body"
                      size="sm"
                      w="400px"
                    >
                      <Tbody>
                        {/* Step 1 Information Table Part 1 */}
                        {activeStep === 0 && (
                          <>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Dispute Number
                              </Th>
                              <Td border="3px double black">
                                #D
                                {reportDetails.dispute.number
                                  .toString()
                                  .padStart(4, "0")}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Submitted By
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.submittedBy
                                  ? `${reportDetails.submittedBy.firstName} ${reportDetails.submittedBy.lastName}`
                                  : ""}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Person/s Involved
                              </Th>
                              <Td border="3px double black">
                                <UnorderedList>
                                  {reportDetails.personsInvolved.map(
                                    (item: PersonalInfo) => (
                                      <ListItem key={item.id}>
                                        {item.firstName} {item.lastName}
                                      </ListItem>
                                    )
                                  )}
                                </UnorderedList>
                              </Td>
                            </Tr>
                          </>
                        )}
                        {/* Step 2 Information Table */}
                        {activeStep === 1 && (
                          <Tr whiteSpace="normal">
                            <Th border="3px double black" w="110px">
                              Officer-in-Charge
                            </Th>
                            <Td
                              border="3px double black"
                              color={
                                reportDetails.officerAssigned
                                  ? "black"
                                  : "lightgray"
                              }
                              fontStyle={
                                reportDetails.officerAssigned
                                  ? "normal"
                                  : "italic"
                              }
                            >
                              {reportDetails.officerAssigned
                                ? `${reportDetails.officerAssigned.firstName} ${reportDetails.officerAssigned.lastName}`
                                : "Unassigned"}
                            </Td>
                          </Tr>
                        )}
                        {/* Step 5 Information Table */}
                        {activeStep === 2 && (
                          <>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Dispute Type
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.disputeType.title}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Violation Type
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.violationType
                                  ? reportDetails.violationType.title
                                  : "N/A"}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Penalty Fee
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.violationType
                                  ? `₱ ${reportDetails.violationType.fee}`
                                  : "N/A"}
                              </Td>
                            </Tr>
                          </>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  {activeStep === 0 && (
                    // Step 1 Information Table Part 2
                    <TableContainer>
                      <Table
                        variant="unstyled"
                        fontFamily="font.body"
                        size="sm"
                        maxWidth="400px"
                      >
                        <Tbody>
                          <>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Date Submitted
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.dispute.createdAt
                                  ? format(
                                      new Date(reportDetails.dispute.createdAt)
                                        ?.toISOString()
                                        .split("T")[0],
                                      "MMMM dd, yyyy"
                                    )
                                  : ""}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Date of Dispute
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.dispute.disputeDate
                                  ? format(
                                      new Date(
                                        reportDetails.dispute.disputeDate
                                      )
                                        ?.toISOString()
                                        .split("T")[0],
                                      "MMMM dd, yyyy"
                                    )
                                  : ""}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Dispute Type
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.disputeType.title}
                              </Td>
                            </Tr>
                          </>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}
                </Flex>
                {/* Dispute Description */}
                {activeStep === 0 && (
                  <Text
                    fontSize="xs"
                    fontFamily="font.body"
                    color="grey"
                    textAlign="justify"
                  >
                    <span className="font-bold">Dispute Description:</span>{" "}
                    <br />
                    {reportDetails.dispute.description}
                  </Text>
                )}
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </div>
  );
};

export default ViewProgress;
