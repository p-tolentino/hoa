"use client";

import { Separator } from "@/components/ui/separator";
import {
  Box,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@chakra-ui/react";
import AddDisputeButton from "./_components/add";
import EditDisputeButton from "./_components/edit";
import { DeleteIcon } from "@chakra-ui/icons";

function listOfDisputes() {
  const title = "List of Common Association Disputes";
  const description =
    "View the list of common disputes occurence in a homeowners association.";
  const commonDisputes = [
    {
      title: "Non-payment of Dues and Assessments",
      description:
        "Disputes may occur when homeowners fail to pay their HOA dues or assessments. This can lead to financial challenges for the HOA and disagreements over the enforcement of payment policies.",
    },
    {
      title: "Noise and Nuisance",
      description:
        "Issues related to excessive noise, disruptive behavior, or activities that create a nuisance can lead to disputes. This may involve conflicts between neighbors or enforcement of community rules to maintain a peaceful living environment.",
    },
    {
      title: "Parking Disputes",
      description:
        "Common parking disputes include issues with unauthorized vehicles, improper use of designated parking spaces, or disputes over the number of vehicles a homeowner is allowed to park within the community.",
    },
    {
      title: "Pets and Animal-related Disputes",
      description:
        "Conflicts may arise over pet ownership, noise from pets, failure to adhere to leash rules, or violations of pet-related guidelines outlined in the HOA's governing documents.",
    },
    {
      title: "Communication Issues",
      description:
        "Poor communication between homeowners and the HOA, or among neighbors, can lead to misunderstandings and disputes. Lack of transparency or failure to provide timely information can contribute to conflicts.",
    },
  ];

  return (
    <>
      <Box mb="1%">
        <Flex justifyContent="space-between">
          <Stack>
            <Heading size="lg" fontFamily="font.heading">
              {title}
            </Heading>
            <Text fontSize="md" fontFamily="font.body" mt="-0.5%">
              {description}
            </Text>
          </Stack>
          <HStack p="10px">
            <AddDisputeButton />
          </HStack>
        </Flex>
      </Box>
      <Separator />

      <Box
        w="100%"
        maxH="75vh"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mt="2%"
        mb="1%"
        overflowY="auto"
      >
        <SimpleGrid columns={3} spacing={10} p="30px">
          {commonDisputes.map((disputes) => (
            <Card>
              <HStack justifyContent="space-between">
                <CardHeader>
                  <Heading size="md"> {disputes.title}</Heading>
                </CardHeader>
                <Stack direction="row">
                  <EditDisputeButton />
                  <Button size="sm" mr="10px" colorScheme="red">
                    <DeleteIcon />
                  </Button>
                </Stack>
              </HStack>
              <CardBody>
                <Text fontSize="sm" fontFamily="font.body" textAlign="justify">
                  {disputes.description}
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
export default listOfDisputes;
