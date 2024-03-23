"use client";

import BackButton from "@/components/system/BackButton";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AddIcon } from "@chakra-ui/icons";
import {
  Input,
  HStack,
  Text,
  Select,
  Button,
  Box,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

const Facility = () => {
  const [personsInvolved, setPersonsInvolved] = useState([""]);

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
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Facility Reservation"
          description="Reserve facilities within the Homeowners Association"
        />
        <BackButton />
      </div>
      <Separator className="mt-2" />
      <Flex justifyContent="space-between" gap={5}>
        <Box w="50%">
          <HStack mt={5} gap={5}>
            <Text fontSize="sm" fontWeight="semibold">
              Select a facility:
            </Text>
            <Select
              fontFamily="font.body"
              placeholder="Select facility"
              size="sm"
              w="60%"
            >
              <option value="clubhouse">Clubhouse</option>
              <option value="pool">Swimming Pool</option>
              <option value="court">Basketball Court</option>
            </Select>
          </HStack>
          <HStack mt={5} gap={5}>
            <Text fontSize="sm" fontWeight="semibold">
              Date of reservation:
            </Text>
            <Input
              type="datetime-local"
              fontFamily="font.body"
              size="sm"
              w="30%"
            />
          </HStack>
          <HStack mt={5} gap={5}>
            <Text fontSize="sm" fontWeight="semibold">
              Purpose of reservation:
            </Text>
            <Input
              type="string"
              placeholder="Purpose of the reservation"
              fontFamily="font.body"
              size="sm"
              w="60%"
            />
          </HStack>
          <Stack mt={5} gap={3}>
            <HStack justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                Guests:
              </Text>
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
              <Box key={index}>
                <HStack>
                  <Select
                    key={index}
                    size="sm"
                    fontFamily="font.body"
                    w="full"
                    onChange={(e) =>
                      handlePersonInputChange(index, e.target.value)
                    }
                    value={person}
                  ></Select>
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
                </HStack>
              </Box>
            ))}
          </Stack>
          <Box mt={5} textAlign="center">
            <Button size="sm" type="submit" colorScheme="yellow">
              Confirm Reservation
            </Button>
          </Box>
        </Box>
        <Box
          bg="gray"
          w="50%"
          maxH="full"
          color="white"
          p="20px"
          textAlign="center"
        >
          Facility Availability Calendar
        </Box>
      </Flex>
    </>
  );
};

export default Facility;
