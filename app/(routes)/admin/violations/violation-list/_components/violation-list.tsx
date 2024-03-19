"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Stack,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import AddViolationButton from "./AddViolationButton";
import EditViolationButton from "./EditViolationButton";
import DeleteViolationButton from "./DeleteViolationButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ViolationType } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ViolationListProps {
  violations: ViolationType[];
}

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ViolationList: React.FC<ViolationListProps> = ({ violations }) => {
  const title = "List of Homeowners' Association Violations";
  const description =
    "View the list of violations that can be reported within the Homeowners' Association. Corresponding penalties for each violation type is included.";

  const router = useRouter();

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <Stack direction={{ md: "column", lg: "row" }} spacing="3">
          <AddViolationButton />
          <Button
            size="sm"
            colorScheme="gray"
            as={Link}
            href="/admin/violations"
          >
            Go Back
          </Button>
        </Stack>
      </Flex>
      <Separator className="mt-4 mb-6" />
      <Flex gap={10} mr={5}>
        <Flex flexGrow={3}>
          <ScrollArea className="h-[75vh] pr-5">
            <SimpleGrid columns={{ md: 1, lg: 3 }} spacing={5} px={2}>
              {violations.map((violation) => (
                <Card key={violation.title} pb={3}>
                  <Stack>
                    <CardHeader pb="0">
                      <HStack justifyContent="space-between" align="end">
                        {/* Violation Title */}
                        <Text
                          size="md"
                          fontWeight="bold"
                          fontFamily="font.heading"
                        >
                          {violation.title}
                        </Text>

                        <ButtonGroup>
                          <EditViolationButton violation={violation} />

                          <DeleteViolationButton
                            violation={violation}
                            continueDeletion={(confirmed) => {
                              if (confirmed) {
                                router.refresh();
                              }
                            }}
                          />
                        </ButtonGroup>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <Stack spacing="20px">
                        {/* Violation Description */}
                        <Text
                          fontSize="sm"
                          fontFamily="font.body"
                          textAlign="justify"
                        >
                          {violation.description}
                        </Text>
                        {/* Violation Levels and Penalty Fees */}
                        <TableContainer mx="1rem">
                          <Table
                            size="xs"
                            variant="simple"
                            fontFamily="font.body"
                          >
                            <Thead>
                              <Tr>
                                <Th fontSize="xs" fontFamily="font.body">
                                  Violation Level
                                </Th>
                                <Th
                                  fontSize="xs"
                                  fontFamily="font.body"
                                  textAlign="center"
                                >
                                  Penalty Fee
                                </Th>
                              </Tr>
                            </Thead>
                            <Tbody fontSize="sm" fontFamily="font.body">
                              <Tr>
                                {/* Violation Level */}
                                <Td pl="0.5rem">First Offense:</Td>
                                {/* Penalty Fee */}
                                <Td textAlign="right">
                                  ₱ {formatNumber(violation?.firstOffenseFee)}
                                </Td>
                              </Tr>
                              <Tr>
                                {/* Violation Level */}
                                <Td pl="0.5rem">Second Offense:</Td>
                                {/* Penalty Fee */}
                                <Td textAlign="right">
                                  ₱ {formatNumber(violation?.secondOffenseFee)}
                                </Td>
                              </Tr>
                              <Tr>
                                {/* Violation Level */}
                                <Td pl="0.5rem">Third Offense:</Td>
                                {/* Penalty Fee */}
                                <Td textAlign="right">
                                  ₱ {formatNumber(violation?.thirdOffenseFee)}
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Stack>
                    </CardBody>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Flex>
      </Flex>
    </>
  );
};

export default ViolationList;
