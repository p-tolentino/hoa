import {
  Box,
  Flex,
  Link,
  List,
  ListItem,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { Priority, ViolationOfficerActivity } from "@prisma/client";
import { format } from "date-fns";

export default function ViewReviewResults({
  reportDetails,
}: {
  reportDetails: any;
}) {
  return (
    <Stack spacing={5}>
      <Flex gap={10}>
        <Box>
          <Flex justifyContent="space-between">
            <Box>
              <Text
                fontWeight="semibold"
                fontFamily="font.heading"
                lineHeight={1}
              >
                Violation Case: Review Results
              </Text>
              <Text fontFamily="font.body" fontSize="sm" color="grey">
                Date reviewed:{" "}
                {reportDetails.violation.commReviewDate
                  ? format(
                      new Date(reportDetails.violation.commReviewDate)
                        ?.toISOString()
                        .split("T")[0],
                      "MMMM dd, yyyy"
                    )
                  : ""}
              </Text>
            </Box>
            {/* <Link
              href='#keyActivities'
              fontSize='sm'
              fontFamily='font.body'
              color='blue.500'
            >
              View Key Activities
            </Link> */}
          </Flex>
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
            <Text fontFamily="font.body" fontSize="sm" textAlign="justify">
              {reportDetails.violation.committeeReview}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box>
            <Text
              fontWeight="semibold"
              fontFamily="font.heading"
              lineHeight={1}
            >
              Officer Assigned
            </Text>
            <Text fontFamily="font.body" fontSize="sm" color="grey">
              Date assigned:{" "}
              {reportDetails.violation.commReviewDate
                ? format(
                    new Date(reportDetails.violation.commReviewDate)
                      ?.toISOString()
                      .split("T")[0],
                    "MMMM dd, yyyy"
                  )
                : ""}
            </Text>
          </Box>
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
                      Officer Assigned
                    </Th>
                    <Td
                      border="3px double black"
                      color={
                        reportDetails.officerAssigned ? "black" : "lightgray"
                      }
                      fontStyle={
                        reportDetails.officerAssigned ? "normal" : "italic"
                      }
                    >
                      {reportDetails.officerAssigned
                        ? `${reportDetails.officerAssigned.firstName} ${reportDetails.officerAssigned.lastName}`
                        : "Unassigned"}
                    </Td>
                  </Tr>
                  {/* {reportDetails.officerAssigned && (
                    <Tr whiteSpace="normal">
                      <Th border="3px double black" w="110px">
                        Case Priority
                      </Th>
                      <Td
                        border="3px double black"
                        color={
                          reportDetails.violation.priority === Priority.HIGH
                            ? "red"
                            : "black"
                        }
                      >
                        {reportDetails.violation.priority
                          ? `${reportDetails.violation.priority}`
                          : "N/A"}
                      </Td>
                    </Tr>
                  )} */}
                </Tbody>
              </Table>
            </TableContainer>
            <Text fontSize="xs" fontFamily="font.body" textAlign="justify">
              This officer has been assigned to oversee this case exclusively.
              They are the sole authorized individual to provide progress
              reports regarding this case.
            </Text>
          </Stack>
        </Box>
      </Flex>
      <Box id="keyActivities">
        <Box>
          <Text fontWeight="semibold" fontFamily="font.heading" lineHeight={1}>
            Key Activities for Officer Assigned
          </Text>
          {/* <Text fontFamily="font.body" fontSize="sm" color="grey">
              Date created:{" "}
              {reportDetails.violation.commReviewDate
                ? format(
                    new Date(reportDetails.violation.commReviewDate)
                      ?.toISOString()
                      .split("T")[0],
                    "MMMM dd, yyyy"
                  )
                : ""}
            </Text> */}
        </Box>
        <UnorderedList mb="1rem" ml={7} mt={3} fontFamily="font.body">
          {reportDetails.officerActivities.map(
            (activity: ViolationOfficerActivity) => (
              <ListItem key={activity.id}>
                {activity.title}
                <span className="ml-2 text-sm text-gray-500">
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
              </ListItem>
            )
          )}
        </UnorderedList>
        {/* <Stepper
          index={activeStep}
          orientation="vertical"
          w="max-content"
          h="50vh"
          p="1.5rem"
          gap="0"
          colorScheme="green"
          size="md"
          overflowY="auto"
        >
          {keyActivities.map((activity, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box fontFamily="font.body" w="10vw">
                <StepTitle>{activity.title}</StepTitle>
                <StepDescription className="text-xs">
                  {activity.dueDate}
                </StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper> */}
      </Box>
    </Stack>
  );
}
