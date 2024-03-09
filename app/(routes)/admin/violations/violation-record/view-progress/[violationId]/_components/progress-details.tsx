"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
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
  Link,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
} from "@chakra-ui/react";
import ViolationBylaws from "../../../../process-guide/_components/ViolationBylaws";
import { PersonalInfo, Violation, ViolationType } from "@prisma/client";
import { format } from "date-fns";

interface ProgressDetailsProps {
  reportDetails: any;
}

export const ProgressDetails: React.FC<ProgressDetailsProps> = ({
  reportDetails,
}) => {
  console.log(reportDetails);

  const processSteps = [
    {
      title: "Violation Form Submission",
      description:
        "Homeowners submit violation reports through the Violation Monitoring module in the MIS.",
    },
    {
      title: "Violation Intake and Validation",
      description:
        "HOA staff or designated personnel review submitted violation reports.",
    },
    {
      title: "Acknowledgment of Violation Report Submission",
      description:
        "Homeowners receive acknowledgment of the violation report's receipt through the MIS.",
    },
    {
      title: "Review by Environment and Security Committee",
      description:
        "The Environment and Security Committee receives and reviews the violation report.",
    },
    {
      title: "Issue Resolution and Enforcement with Penalty Fee",
      description:
        "The Officer-in-Charge takes appropriate actions based on their decision, including issuing a violation notice to the homeowner.",
    },
    {
      title: "Live Updates on Violation Enforcement",
      description:
        "The reporter and alleged violator are kept informed throughout the process.",
    },
    {
      title: "Record Keeping and Documentation",
      description:
        "The HOA maintains a comprehensive record of violation reports, actions taken, and penalty fees imposed.",
    },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: processSteps.length,
  });

  return (
    <div>
      <Flex justifyContent="space-between">
        <Heading
          title={`#V00${reportDetails.violation.number} - Violation Enforcement Progress`}
          description="View the progress of your selection violation within the Homeowners' Association"
        />
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Flex gap={10} h="65vh">
        <Stepper
          index={activeStep}
          orientation="vertical"
          width="min-content"
          gap="0"
          colorScheme="yellow"
          size="sm"
        >
          {processSteps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
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
                <StepTitle>Step {index + 1}</StepTitle>
                <StepDescription>{step.title}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box w="100%">
          <Card shadow="lg" mb="1rem" h="60vh" p={5} overflowY="auto">
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
                  <UnorderedList>
                    {/* Step 1 Details */}
                    {activeStep === 0 && (
                      <div>
                        <ListItem>
                          Homeowners provide details about the alleged
                          violation, including the type of violation, date, and
                          a detailed description of the violation.
                        </ListItem>
                        <ListItem>
                          Supporting evidence such as photos or documents may be
                          attached to the violation report.
                        </ListItem>
                      </div>
                    )}
                    {/* Step 2 Details */}
                    {activeStep === 1 && (
                      <div>
                        <ListItem>
                          HOA staff or designated personnel validate the
                          violation report by ensuring it contains sufficient
                          information and evidence.
                        </ListItem>
                        <ListItem>
                          They confirm that the reported issue falls within the
                          jurisdiction of the HOA's rules and regulations
                          indicated in the {<ViolationBylaws />}.
                        </ListItem>
                        <ListItem>
                          A unique identifier or tracking number is assigned to
                          the violation report for future reference.
                        </ListItem>
                      </div>
                    )}
                    {/* Step 3 Details */}
                    {activeStep === 2 && (
                      <div>
                        <ListItem>
                          Homeowners can view their violation report submission
                          in the{" "}
                          <Link
                            href="/admin/violations/submitted-violations"
                            color="blue.500"
                            textDecor="underline"
                          >
                            Submitted Violation Reports
                          </Link>{" "}
                          in the Violation Monitoring module.
                        </ListItem>
                        <ListItem>
                          The upcoming review process and potential follow-up
                          actions can also be accessed by clicking on the
                          submitted violation report.
                        </ListItem>
                      </div>
                    )}
                    {/* Step 4 Details */}
                    {activeStep === 3 && (
                      <div>
                        <ListItem>
                          The Environment and Security Committee receives the
                          violation report in the MIS and assigns an
                          officer-in-charge to oversee its resolution.
                        </ListItem>
                        <ListItem>
                          The Officer-in-Charge makes a decision whether the
                          reported violation is valid and if any action is
                          required.
                        </ListItem>
                      </div>
                    )}
                    {/* Step 5 Details */}
                    {activeStep === 4 && (
                      <div>
                        <ListItem>
                          The alleged violator receives a notice outlining the
                          nature of the violation, required corrective actions,
                          and a penalty fee.
                        </ListItem>
                        <ListItem>
                          The homeowner is informed that the penalty fee is
                          added to their{" "}
                          <Link
                            href="/admin/finance/statement-of-account"
                            color="blue.500"
                            textDecor="underline"
                          >
                            statement of account
                          </Link>
                          , which can be accessed via the Finance Management
                          module.
                        </ListItem>
                      </div>
                    )}
                    {/* Step 6 Details */}
                    {activeStep === 5 && (
                      <div>
                        <ListItem>
                          Homeowners receive notifications on committee
                          decisions and enforcement actions, including details
                          of the penalty fee.
                        </ListItem>
                        <ListItem>
                          The alleged violator can access the procedure on how
                          to{" "}
                          <Link
                            href="#rectifyViolations"
                            color="blue.500"
                            textDecor="underline"
                          >
                            rectify the violation
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#payPenaltyFee"
                            color="blue.500"
                            textDecor="underline"
                          >
                            pay the penalty fee
                          </Link>{" "}
                          in the Violation Review Process Guide in the Violation
                          Monitoring module.
                        </ListItem>
                      </div>
                    )}
                    {/* Step 7 Details */}
                    {activeStep === 6 && (
                      <div>
                        <ListItem>
                          Comprehensive records of violation reports, actions
                          taken, and penalty fees imposed are maintained.
                        </ListItem>
                        <ListItem>
                          Each violation report is documented, including
                          evidence, committee decisions, enforcement actions,
                          and penalty fee details.
                        </ListItem>
                        <ListItem>
                          Records are kept organized and easily accessible for
                          future reference in a secure system.
                        </ListItem>
                      </div>
                    )}
                  </UnorderedList>
                </Box>
                {/* Step Information Table */}

                {(activeStep === 0 || activeStep === 1 || activeStep === 4) && (
                  <Box>
                    <TableContainer>
                      <Table
                        variant="unstyled"
                        fontFamily="font.body"
                        size="sm"
                        w="min-content"
                      >
                        <Tbody>
                          {/* Step 1 Information Table */}
                          {activeStep === 0 && (
                            <Tr>
                              <Th border="3px double black">
                                Violation Form Number
                              </Th>
                              <Td border="3px double black">
                                #V00{reportDetails.violation.number}
                              </Td>
                            </Tr>
                          )}
                          {/* Step 2 Information Table */}
                          {activeStep === 1 && (
                            <Tr>
                              <Th border="3px double black">
                                Officer-in-Charge
                              </Th>
                              <Td border="3px double black">
                                {reportDetails.officerAssigned
                                  ? `${reportDetails.officerAssigned.firstName} ${reportDetails.violation.officerAssigned.lastName}`
                                  : "Unassigned"}
                              </Td>
                            </Tr>
                          )}
                          {/* Step 5 Information Table */}
                          {activeStep === 4 && (
                            <>
                              <Tr>
                                <Th border="3px double black">
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
                              <Tr>
                                <Th border="3px double black">
                                  Violation Type
                                </Th>
                                <Td border="3px double black">
                                  {reportDetails.violationType.title}
                                </Td>
                              </Tr>
                              <Tr>
                                <Th border="3px double black">Penalty Fee</Th>
                                <Td border="3px double black">
                                  ₱ {reportDetails.violationType.fee}
                                </Td>
                              </Tr>
                            </>
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </div>
  );
};

export default ProgressDetails;
