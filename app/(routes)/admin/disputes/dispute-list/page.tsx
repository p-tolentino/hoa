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
} from "@chakra-ui/react";
import AddDisputeButton from "./_components/AddDisputeButton";
import EditDisputeButton from "./_components/EditDisputeButton";
import { DeleteIcon } from "@chakra-ui/icons";
import * as React from "react";

export default function ListOfDisputes() {
  const title = "List of Common Association Disputes";
  const description =
    "View the list of common disputes occurence in a homeowners association.";
  const commonDisputes = [
    {
      title: "Parking Disputes",
      description:
        "Common parking disputes include issues with unauthorized vehicles, improper use of designated parking spaces, or disputes over the number of vehicles a homeowner is allowed to park within the community.",
    },
    {
      title: "Noise and Nuisance",
      description:
        "Issues related to excessive noise, disruptive behavior, or activities that create a nuisance can lead to disputes. This may involve conflicts between neighbors or enforcement of community rules to maintain a peaceful living environment.",
    },
    {
      title: "Behavioral Issues",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam alias sequi suscipit voluptas, corporis nemo.",
    },
    {
      title: "Pet-related Issues",
      description:
        "Conflicts may arise over pet ownership, noise from pets, failure to adhere to leash rules, or violations of pet-related guidelines outlined in the HOA's governing documents.",
    },
  ];

  const [disputes, setDisputes] = React.useState([...commonDisputes]);

  const removeDispute = (titleToRemove: string) => {
    const updatedDisputes = disputes.filter(
      (dispute) => dispute.title !== titleToRemove
    );
    setDisputes(updatedDisputes);
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <AddDisputeButton />
      </Flex>
      <Separator className="mt-4 mb-6" />
      <SimpleGrid columns={3} spacing={5} px={2}>
        {disputes.map((dispute) => (
          <Card key={dispute.title} pb={3}>
            <CardHeader pb="0">
              <HStack justifyContent="space-between" align="end">
                <Text size="md" fontWeight="bold" fontFamily="font.heading">
                  {dispute.title}
                </Text>
                <ButtonGroup>
                  <EditDisputeButton
                    key={dispute.title}
                    title={dispute.title}
                    description={dispute.description}
                  />
                  <Button
                    size="sm"
                    mr="10px"
                    colorScheme="red"
                    onClick={() => removeDispute(dispute.title)}
                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </HStack>
            </CardHeader>
            <CardBody pt={3}>
              <Text fontSize="sm" fontFamily="font.body" textAlign="justify">
                {dispute.description}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
