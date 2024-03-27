import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  UnorderedList,
  ListItem,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
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
  Stack,
  Center,
  Divider,
  Link,
} from "@chakra-ui/react";
import { report } from "process";
import { format } from "date-fns";
import {
  PersonalInfo,
  ViolationOfficerActivity,
  ViolationProgress,
} from "@prisma/client";
import ViewProgressReport from "./view-progress-report";
import ViewReviewResults from "./view-review-results";

interface ProcessStep {
  value: string;
  title: string;
  description: string;
  details: string[];
}

interface StepCardProps {
  stepIndex: number;
  processSteps: ProcessStep[];
  reportDetails: any;
}

export default function StepCard({
  stepIndex,
  processSteps,
  reportDetails,
}: StepCardProps) {
  const { activeStep } = useSteps({
    index: 0,
    count: reportDetails.officerActivities.length,
  });

  return (
    <Card shadow="lg" my="1.5rem" h="62vh" p="10px 10px 20px 10px">
      <CardHeader pb={0}>
        <Text
          fontSize="sm"
          fontFamily="font.body"
          color="brand.500"
          fontWeight="bold"
        >
          Step {stepIndex + 1}
        </Text>
        <Text fontSize="lg" fontFamily="font.heading" fontWeight="bold">
          {/* Step Title */}
          {processSteps[stepIndex].title}
        </Text>
        <Text fontFamily="font.body" textAlign="justify">
          {/* Step Description */}
          {processSteps[stepIndex].description}
        </Text>
        <Divider mt="0.5rem" />
      </CardHeader>
      <CardBody pt={2}>
        <Box overflowY="auto" h="42vh">
          <Box
            fontFamily="font.body"
            fontSize="sm"
            textAlign="justify"
            mb="2rem"
          >
            {/* Step Details */}
            <Text>Details:</Text>
            <UnorderedList mb="1rem" ml={7}>
              {processSteps[stepIndex].details.map((detail, index) => (
                <ListItem key={index}>{detail}</ListItem>
              ))}
            </UnorderedList>
          </Box>

          {/* Step 1 Content */}
          {stepIndex === 0 && (
            <Box>
              <Box>
                <Text
                  fontWeight="semibold"
                  fontFamily="font.heading"
                  lineHeight={1}
                >
                  Violation Form Contents
                </Text>
                <Text fontFamily="font.body" fontSize="sm" color="grey">
                  Date received:{" "}
                  {reportDetails.violation.createdAt
                    ? format(
                        new Date(reportDetails.violation.createdAt)
                          ?.toISOString()
                          .split("T")[0],
                        "MMMM dd, yyyy"
                      )
                    : ""}
                </Text>
              </Box>
              <Flex gap={5} pt="1rem">
                <TableContainer>
                  <Table
                    variant="unstyled"
                    fontFamily="font.body"
                    size="sm"
                    w="400px"
                  >
                    <Tbody>
                      <Tr whiteSpace="normal">
                        <Th border="3px double black" w="110px">
                          Violation Number
                        </Th>
                        <Td border="3px double black">
                          #V
                          {reportDetails.violation.number
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
                              (person: PersonalInfo, index: number) => (
                                <ListItem key={index}>
                                  {person.firstName} {person.lastName}
                                </ListItem>
                              )
                            )}
                          </UnorderedList>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table
                    variant="unstyled"
                    fontFamily="font.body"
                    size="sm"
                    width="400px"
                  >
                    <Tbody>
                      <>
                        <Tr whiteSpace="normal">
                          <Th border="3px double black" w="110px">
                            Date Submitted
                          </Th>
                          <Td border="3px double black">
                            {reportDetails.violation.createdAt
                              ? format(
                                  new Date(reportDetails.violation.createdAt)
                                    ?.toISOString()
                                    .split("T")[0],
                                  "MMMM dd, yyyy"
                                )
                              : ""}
                          </Td>
                        </Tr>
                        <Tr whiteSpace="normal">
                          <Th border="3px double black" w="110px">
                            Date of Violation
                          </Th>
                          <Td border="3px double black">
                            {reportDetails.violation.violationDate
                              ? format(
                                  new Date(
                                    reportDetails.violation.violationDate
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
                            Violation Type
                          </Th>
                          <Td border="3px double black">
                            {reportDetails.violationType.title}
                          </Td>
                        </Tr>
                      </>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
              <Text
                fontSize="xs"
                fontFamily="font.body"
                color="grey"
                textAlign="justify"
                mt={5}
              >
                <span className="font-bold">Violation Description:</span> <br />{" "}
                {reportDetails.violation.description}
              </Text>
            </Box>
          )}

          {/* Step 2 Content */}
          {stepIndex === 1 && (
            <Box>
              {reportDetails.violation.committeeReview ? (
                // <ViewReviewResults
                //   keyActivities={keyActivities}
                //   activeStep={activeStep}
                //   reportDetails={reportDetails}
                // />
                <Box
                  h="24vh"
                  border="1px solid lightgray"
                  borderRadius={5}
                  p={3}
                  overflowY="auto"
                  flex={3}
                >
                  <Center color="gray" h="50%" fontFamily="font.body">
                    {reportDetails.violation.committeeReview}
                  </Center>
                </Box>
              ) : (
                <Box
                  h="24vh"
                  border="1px solid lightgray"
                  borderRadius={5}
                  p={3}
                  overflowY="auto"
                  flex={3}
                >
                  <Center color="gray" h="50%" fontFamily="font.body">
                    No results to show.
                  </Center>
                </Box>
              )}
            </Box>
          )}

          {/* Step 3 Content */}
          {stepIndex === 2 && (
            <ViewReviewResults reportDetails={reportDetails} />
          )}

          {/* Step 4 Content */}
          {stepIndex === 3 && (
            <Box>
              {reportDetails.violation.letterSent ? (
                <Link color="blue.500" fontFamily="font.body">
                  [Download] #V
                  {reportDetails.violation.number
                    .toString()
                    .padStart(4, "0")}{" "}
                  Violation Letter: {reportDetails.violationType.title}
                </Link>
              ) : (
                <Box
                  h="24vh"
                  border="1px solid lightgray"
                  borderRadius={5}
                  p={3}
                  overflowY="auto"
                  flex={3}
                >
                  <Center color="gray" h="50%" fontFamily="font.body">
                    No results to show.
                  </Center>
                </Box>
              )}
            </Box>
          )}

          {/* Step 5 Content */}
          {stepIndex === 4 && (
            <Flex>
              <Box w="40%">
                <Box>
                  <Text
                    fontWeight="semibold"
                    fontFamily="font.heading"
                    lineHeight={1}
                  >
                    Key Activities
                  </Text>
                  <Text fontFamily="font.body" fontSize="sm">
                    You may click the activity title to view its progress
                    reports.
                  </Text>
                </Box>
                <Stepper
                  index={activeStep}
                  w="70vw"
                  h="max-content"
                  p="1rem"
                  gap="3"
                  colorScheme="green"
                  size="md"
                  overflowY="auto"
                >
                  {reportDetails.officerActivities.map(
                    (activity: ViolationOfficerActivity) => (
                      <Step key={activity.id}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>
                        <Box fontFamily="font.body" w="max-content">
                          <StepTitle>
                            <ViewProgressReport
                              activity={activity}
                              progressReports={reportDetails.progressReports.filter(
                                (progress: ViolationProgress) =>
                                  progress.activity === activity.id
                              )}
                            />
                          </StepTitle>
                          <StepDescription className="text-xs">
                            <span className="text-sm text-gray-500">
                              {" (Deadline: "}
                              {activity.deadline
                                ? format(
                                    new Date(activity.deadline)
                                      ?.toISOString()
                                      .split("T")[0],
                                    "MMMM dd, yyyy"
                                  )
                                : ""}
                              {")"}
                            </span>
                          </StepDescription>
                        </Box>
                        <StepSeparator />
                      </Step>
                    )
                  )}
                </Stepper>
              </Box>
            </Flex>
          )}

          {/* Step 6 Content */}
          {stepIndex === 5 && (
            <Box>
              {reportDetails.violation.finalReview ? (
                <Flex gap={10}>
                  <Box>
                    <Text
                      fontWeight="semibold"
                      fontFamily="font.heading"
                      lineHeight={1}
                    >
                      Violation Case: Review Results
                    </Text>
                    <Text fontFamily="font.body" fontSize="sm" color="grey">
                      Date submitted final review:{" "}
                      {reportDetails.violation.finalReviewDate
                        ? format(
                            new Date(reportDetails.violation.finalReviewDate)
                              ?.toISOString()
                              .split("T")[0],
                            "MMMM dd, yyyy"
                          )
                        : ""}
                    </Text>
                    <Box
                      h="18vh"
                      border="1px solid lightgray"
                      borderRadius={5}
                      p={3}
                      overflowY="auto"
                      flex={3}
                      mt="1rem"
                      w="600px"
                    >
                      <Text
                        fontFamily="font.body"
                        fontSize="sm"
                        textAlign="justify"
                      >
                        {reportDetails.violation.finalReview}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <Text
                      fontWeight="semibold"
                      fontFamily="font.heading"
                      lineHeight={1}
                    >
                      Violation Enforcement Information
                    </Text>
                    <Text fontFamily="font.body" fontSize="sm" color="grey">
                      Date enforced:{" "}
                      {reportDetails.violation.finalReviewDate
                        ? format(
                            new Date(reportDetails.violation.finalReviewDate)
                              ?.toISOString()
                              .split("T")[0],
                            "MMMM dd, yyyy"
                          )
                        : ""}
                    </Text>

                    <Stack w="400px" spacing="0.5rem" pt="1rem">
                      <TableContainer>
                        <Table
                          variant="unstyled"
                          fontFamily="font.body"
                          size="sm"
                          w="400px"
                        >
                          <Tbody>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Violation Type
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.violationType.title}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Reason to Close
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.violation.reasonToClose}
                              </Td>
                            </Tr>
                            <Tr whiteSpace="normal">
                              <Th border="3px double black" w="110px">
                                Penalty Fee
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.violation.reasonToClose ===
                                "Appealed"
                                  ? "N/A"
                                  : `₱ ${reportDetails.violationType.firstOffenseFee}`}
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Stack>
                  </Box>
                </Flex>
              ) : (
                <Box
                  h="24vh"
                  border="1px solid lightgray"
                  borderRadius={5}
                  p={3}
                  overflowY="auto"
                  flex={3}
                >
                  <Center color="gray" h="50%" fontFamily="font.body">
                    No results to show.
                  </Center>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  );
}