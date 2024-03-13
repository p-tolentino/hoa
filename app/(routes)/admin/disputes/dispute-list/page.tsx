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
import AddDisputeButton from "./_components/AddDisputeButton";
import EditDisputeButton from "./_components/EditDisputeButton";
import DeleteDisputeButton from "./_components/DeleteDisputeButton";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function ListOfDisputes() {
  const title = "List of Homeowners' Association Disputes";
  const description =
    "View the list of disputes that can be reported with the homeowners' association. A list of the HOA services available to you is included.";
  const disputeTypes = [
    {
      title: "Neighbor-to-Neighbor Conflicts",
      description:
        "Issues that arise between neighbors, such as boundary disputes, property damage, or personal disagreements that escalate to involve the homeowner association.",
    },
    {
      title: "Lease Restrictions",
      description:
        "Conflicts involving the rental of properties in the HOA, including issues related to short-term rentals, tenant behavior, or restrictions on leasing properties.",
    },
    {
      title: "Common Area Maintenance Issues",
      description:
        "Disputes over the upkeep, repair, or use of common areas within the community. Homeowners may disagree with how these areas are maintained or how funds are allocated for their maintenance.",
    },
    {
      title: "Rule Enforcement and Fines",
      description:
        "Disagreements over the enforcement of HOA rules and the imposition of fines. Homeowners might contest the fairness or consistency of rule enforcement.",
    },
    {
      title: "Board Decisions and Elections",
      description:
        "Disputes related to the actions or decisions of the HOA board, including disagreements over election processes or the behavior of board members.",
    },
  ];

  const disputeFees = [
    {
      name: "Mediation or Arbitration Fees",
      cost: "₱ 500",
    },
    {
      name: "Administrative Fees",
      cost: "₱ 200",
    },
    {
      name: "Legal Fees",
      cost: "₱ 800",
    },
    {
      name: "Violation Fees",
      cost: "Cost may vary",
    },
  ];

  const [disputes, setDisputes] = useState([...disputeTypes]);

  const removeDispute = (titleToRemove: string) => {
    const updatedDisputes = disputes.filter(
      (dispute) => dispute.title !== titleToRemove
    );
    setDisputes(updatedDisputes);
  };

  const toast = useToast();

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <Stack direction="row" spacing="3">
          <AddDisputeButton />
          <Button size="sm" colorScheme="gray" as={Link} href="/admin/disputes">
            Go Back
          </Button>
        </Stack>
      </Flex>
      <Separator className="mt-4 mb-6" />
      <Flex gap={10} mr={5}>
        <Flex flexGrow={3}>
          <ScrollArea className="h-[75vh] pr-5">
            <SimpleGrid columns={2} spacing={5} px={2}>
              {disputes.map((dispute) => (
                <Card key={dispute.title} pb={3}>
                  <Stack>
                    <CardHeader pb="0">
                      <HStack justifyContent="space-between" align="end">
                        {/* Dispute Title */}
                        <Text
                          size="md"
                          fontWeight="bold"
                          fontFamily="font.heading"
                        >
                          {dispute.title}
                        </Text>
                        <ButtonGroup>
                          {/* Edit Dispute Button */}
                          <EditDisputeButton
                            key={dispute.title}
                            title={dispute.title}
                            description={dispute.description}
                          />
                          {/* Delete Dispute Button */}
                          <DeleteDisputeButton
                            dispute={dispute}
                            continueDeletion={(confirmed) => {
                              if (confirmed) {
                                removeDispute(dispute.title);
                              }
                            }}
                          />
                        </ButtonGroup>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={3} minH="100px">
                      {/* Dispute Description */}
                      <Text
                        fontSize="sm"
                        fontFamily="font.body"
                        textAlign="justify"
                      >
                        {dispute.description}
                      </Text>
                    </CardBody>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Flex>

        {/* Services Available Table */}
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
                {disputeFees.map((fee, index) => (
                  <Tr key={index}>
                    <Td pl={5}>{fee.name}</Td>
                    <Td
                      isNumeric
                      color={
                        fee.cost !== "Cost may vary" ? "black" : "lightgrey"
                      }
                    >
                      {fee.cost}
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
