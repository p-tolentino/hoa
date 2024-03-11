"use client";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Box,
  Stack,
  HStack,
  Select,
  Flex,
  RadioGroup,
  Radio,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AddIcon } from "@chakra-ui/icons";

export default function ReportForm() {
  const title = "File a Dispute";
  const description =
    "Fill out the Dispute Form to formally request for a dispute resolution from the Homeowners' Association.";

  const disputeTypes = [
    {
      value: "neighbor",
      name: "Neighbor-to-Neighbor Disputes",
    },
    {
      value: "lease",
      name: "Lease Restrictions",
    },
    {
      value: "maintenance",
      name: "Common Area Maintenance Issues",
    },
    {
      value: "rules",
      name: "Rule Enforcement and Fines",
    },
    {
      value: "board",
      name: "Board Decisions and Elections",
    },
  ];

  const violationTypes = [
    {
      value: "delinquent",
      name: "Delinquent Payments",
    },
    {
      value: "breach",
      name: "Breach of Construction/Architechture",
    },
    {
      value: "commercial",
      name: "Unauthorized Commercial Establishment / Business Activities (e.g., Garage Sales)",
    },
    {
      value: "parking",
      name: "Parking Violations",
    },
    {
      value: "speed",
      name: "Speed Limit",
    },
    {
      value: "animals",
      name: "Raising of Animals / Fowls (except for domesticated pets)",
    },
    {
      value: "noise",
      name: "Noise Complaints",
    },
    {
      value: "fires",
      name: "Open Fires (burning of trash, garbage and grass)",
    },
    {
      value: "water",
      name: "Defective Water Meters",
    },
    {
      value: "littering",
      name: "Littering",
    },
    {
      value: "straypets",
      name: "Stray Pets",
    },
  ];

  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [personsInvolved, setPersonsInvolved] = useState([""]);
  const [filesUploaded, setFilesUploaded] = useState([""]);
  const [isViolationInvolved, setIsViolationInvolved] = useState(false);

  const addPersonInput = () => {
    setPersonsInvolved([...personsInvolved, ""]);
  };

  const removePersonInput = (index: number) => {
    const updatedPersonsInvolved = [...personsInvolved];
    updatedPersonsInvolved.splice(index, 1);
    setPersonsInvolved(updatedPersonsInvolved);
  };

  const handlePersonInputChange = (index: number, value: string) => {
    const updatedPersonsInvolved = [...personsInvolved];
    updatedPersonsInvolved[index] = value;
    setPersonsInvolved(updatedPersonsInvolved);
  };

  const addFileUpload = () => {
    setFilesUploaded([...filesUploaded, ""]);
  };

  const removeFileUpload = (index: number) => {
    const updatedFilesUploaded = [...filesUploaded];
    updatedFilesUploaded.splice(index, 1);
    setFilesUploaded(updatedFilesUploaded);
  };

  const handleFileUploadChange = (index: number, value: string) => {
    const updatedFilesUploaded = [...filesUploaded];
    updatedFilesUploaded[index] = value;
    setFilesUploaded(updatedFilesUploaded);
  };

  const handleViolationChange = (value: string) => {
    setIsViolationInvolved(value === "yes");
    setValue(value);
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading title={title} description={description} />
        <Button size="sm" colorScheme="gray" as={Link} href="/admin/disputes">
          Go Back
        </Button>
      </Flex>
      <Separator className="mt-4 mb-6" />

      <Box
        w="80%"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mt="2%"
        p="20px"
        overflowY="auto"
      >
        <form>
          <Stack spacing={5}>
            {/* Date of Dispute */}
            <FormControl isRequired>
              <FormLabel fontSize="md" fontFamily="font.body">
                Date of Dispute:
              </FormLabel>
              <Input
                type="date"
                fontSize="sm"
                fontFamily="font.body"
                w="max-content"
              />
            </FormControl>

            {/* Dispute Type */}
            <FormControl isRequired>
              <FormLabel fontSize="md" fontFamily="font.body" w="max-content">
                Dispute Type
              </FormLabel>
              <Select
                // placeholder='Select Dispute Type'
                size="sm"
                fontFamily="font.body"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option value="" disabled>
                  Select a dispute type
                </option>
                {disputeTypes.map((dispute, index) => (
                  <option key={index} value={dispute.value}>
                    {dispute.name}
                  </option>
                ))}
                <option value="other"> Other </option>
              </Select>
            </FormControl>

            {/* Is Violation Involved? */}
            <FormControl isRequired>
              <Stack direction="row">
                <FormLabel fontSize="md" fontFamily="font.body">
                  Does the dispute involve any violations based on the HOA
                  Bylaws?
                </FormLabel>
                <RadioGroup
                  colorScheme="yellow"
                  fontFamily="font.body"
                  value={value}
                  onChange={handleViolationChange}
                >
                  <Stack direction="row">
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            </FormControl>

            {/* Violation IS involved */}
            {isViolationInvolved && (
              <FormControl>
                <Select
                  mt={-5}
                  size="sm"
                  fontFamily="font.body"
                  onChange={(event) => setType(event.target.value)}
                  value={type}
                >
                  <option value="" disabled>
                    Select a violation type
                  </option>
                  {violationTypes.map((violation, index) => (
                    <option key={index} value={violation.value}>
                      {violation.name}
                    </option>
                  ))}
                  <option value="other"> Other </option>
                </Select>
              </FormControl>
            )}

            {/* Dispute Description */}
            <FormControl isRequired>
              <FormLabel fontSize="md" fontFamily="font.body">
                Description:
              </FormLabel>
              <Textarea
                size="sm"
                placeholder="Tell us what happened..."
                h="160px"
                fontFamily="font.body"
                resize={"none"}
              />
            </FormControl>

            {/* Dispute Document Uploading */}
            <FormControl isRequired>
              <HStack justifyContent="space-between">
                <FormLabel fontSize="md" fontFamily="font.body">
                  Upload your supporting documents:
                </FormLabel>
                <Button
                  size="xs"
                  mt="-1"
                  leftIcon={<AddIcon />}
                  onClick={addFileUpload}
                >
                  Add File
                </Button>
              </HStack>
              {filesUploaded.map((file, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Input
                    type="file"
                    size="sm"
                    fontFamily="font.body"
                    mb={2}
                    value={file}
                    onChange={(e) =>
                      handleFileUploadChange(index, e.target.value)
                    }
                  />
                  {filesUploaded.length > 1 && index !== 0 && (
                    <Button
                      size="xs"
                      colorScheme="red"
                      ml={2}
                      onClick={() => removeFileUpload(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}
              <FormHelperText fontSize="xs" mt="-1" pt={2}>
                This will allow us to gain more information about the dispute
                that would help us in decision making.
              </FormHelperText>
            </FormControl>

            {/* Person/s Involved */}
            <FormControl isRequired>
              <HStack justifyContent="space-between">
                <FormLabel fontSize="md" fontFamily="font.body">
                  Person/s Involved
                </FormLabel>
                <Button
                  size="xs"
                  mt="-1"
                  leftIcon={<AddIcon />}
                  onClick={addPersonInput}
                >
                  Add Person
                </Button>
              </HStack>
              {personsInvolved.map((person, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Select
                    key={index}
                    size="sm"
                    fontFamily="font.body"
                    mb={2}
                    w="full"
                    onChange={(e) =>
                      handlePersonInputChange(index, e.target.value)
                    }
                    value={person}
                  >
                    <option value="" disabled>
                      Select from users...
                    </option>
                    {/* {users.map(user => {
          if (user.userId !== currentUser?.id) {
            return (
              <option key={user.userId} value={user.userId}>
                {user.firstName} {user.lastName}
              </option>
            )
          }
        })} */}
                  </Select>

                  {personsInvolved.length > 1 && index !== 0 && (
                    <Button
                      size="xs"
                      colorScheme="red"
                      ml={2}
                      onClick={() => removePersonInput(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}

              <FormHelperText fontSize="xs" mt="-1" pt={2}>
                This will allow us to contact the individuals involved in the
                dispute.
              </FormHelperText>
            </FormControl>
            {/* Submit Button */}
            <Box textAlign="center">
              <FormControl>
                <Button size="sm" type="submit" colorScheme="yellow" my="20px">
                  Submit Dispute Form
                </Button>
              </FormControl>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
}
