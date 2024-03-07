"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Stack,
  Text,
  SimpleGrid,
  Flex,
  Box,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import AddViolationButton from "./_components/AddViolationButton";
import EditViolationButton from "./_components/EditViolationButton";
import DeleteViolationButton from "./_components/DeleteViolationButton";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function ListOfViolations() {
  const title = "List of Homeowners' Association Violations";
  const description =
    "View the list of violations that can be reported within the Homeowners' Association. Corresponding penalties for each violation type is included.";
  const violationTypes = [
    {
      title: "Delinquent Payments",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Breach of Construction",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Unauthorized Commercial Establishment",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Parking Violations",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Speed Limit",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Raising of Animals/Fowls",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Noise Complaints",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Open Fires",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Defective Water Meters",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Littering",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
    {
      title: "Stray Pets",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum maiores repellendus officiis. Culpa nihil ad recusandae",
    },
  ];

  const violationPenalties = [
    {
      name: "Delinquent Payments",
      cost: "₱ 500",
    },
    {
      name: "Breach of Construction",
      cost: "₱ 200",
    },
    {
      name: "Unauthorized Commercial Establishment",
      cost: "₱ 800",
    },
    {
      name: "Parking Violations",
      cost: "₱ 200",
    },
    {
      name: "Speed Limit",
      cost: "₱ 200",
    },
    {
      name: "Raising of Animals/Fowls",
      cost: "₱ 200",
    },
    {
      name: "Noise Complaints",
      cost: "₱ 200",
    },
    {
      name: "Open Fires",
      cost: "₱ 200",
    },
    {
      name: "Defective Water Meters",
      cost: "₱ 200",
    },
    {
      name: "Littering",
      cost: "₱ 200",
    },
    {
      name: "Stray Pets",
      cost: "₱ 200",
    },
  ];

  const [violations, setViolations] = useState([...violationTypes]);

  const removeViolation = (titleToRemove: string) => {
    const updatedViolations = violations.filter(
      (violation) => violation.title !== titleToRemove
    );
    setViolations(updatedViolations);
  };

  const toast = useToast();

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <Stack direction="row" spacing="3">
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
            <SimpleGrid columns={2} spacing={5} px={2}>
              {violations.map((violation) => (
                <Card key={violation.title} pb={3}>
                  <Stack>
                    <CardHeader pb="0">
                      <HStack justifyContent="space-between" align="end">
                        {/* Dispute Title */}
                        <Text
                          size="md"
                          fontWeight="bold"
                          fontFamily="font.heading"
                        >
                          {violation.title}
                        </Text>
                        <ButtonGroup>
                          {/* Edit Violation Button */}
                          <EditViolationButton
                            key={violation.title}
                            title={violation.title}
                            description={violation.description}
                          />
                          {/* Delete Violation Button */}
                          <DeleteViolationButton
                            violation={violation}
                            continueDeletion={(confirmed) => {
                              if (confirmed) {
                                removeViolation(violation.title);
                              }
                            }}
                          />
                        </ButtonGroup>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={3} minH="100px">
                      {/* Violation Description */}
                      <Text
                        fontSize="sm"
                        fontFamily="font.body"
                        textAlign="justify"
                      >
                        {violation.description}
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Flex>

        {/* Penalties Table */}
        <Flex flexGrow={1}>
          <TableContainer w="min-content">
            <Table size="sm" fontFamily="font.body">
              <Thead>
                <Tr>
                  <Th fontSize="sm" fontFamily="font.body" pb={3}>
                    HOA Services Available
                  </Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody fontSize="sm" fontFamily="font.body">
                {violationPenalties.map((penalty, index) => (
                  <Tr key={index}>
                    <Td pl={5}>{penalty.name}</Td>
                    <Td
                      isNumeric
                      color={
                        penalty.cost !== "Cost may vary" ? "black" : "lightgrey"
                      }
                    >
                      {penalty.cost}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </>
  );
}
