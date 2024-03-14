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
  Heading,
  Text,
  HStack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function FileComplaint() {
  const title = "File a Complaint";
  const description = "Fill up the Complaint Form to report a dispute.";

  const [category, setCategory] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleComplaintChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputComplaint = e.target.value;
    setComplaint(inputComplaint);
  };

  return (
    <>
      <Box mb="1%">
        <Stack>
          <Heading size="lg" fontFamily="font.heading">
            {title}
          </Heading>
          <Text fontSize="md" fontFamily="font.body" mt="-0.5%">
            {description}
          </Text>
        </Stack>
      </Box>
      <Separator />

      <Box
        w="80%"
        h="80%"
        border="1px"
        borderColor="gray.200"
        borderRadius="10px"
        mt="2%"
        p="20px"
        mb="1%"
      >
        <FormControl isRequired>
          <Stack spacing="15px">
            <FormLabel fontSize="md" fontFamily="font.body">
              Title
            </FormLabel>
            <Input
              w="50%"
              size="sm"
              type="string"
              placeholder="Enter a Title"
              mt="-0.5%"
            />
            <FormHelperText fontSize="xs" mt="-0.5%">
              This will be the title of your complaint.
            </FormHelperText>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold">
                Category of Dispute:
              </FormLabel>
              <RadioGroup
                size="sm"
                colorScheme="yellow"
                onChange={setCategory}
                value={category}
              >
                <Stack spacing={5} direction="row" fontFamily="font.body">
                  <Radio value="parking">Parking</Radio>
                  <Radio value="noise">Noise</Radio>
                  <Radio value="behavioralDispute">Behavioral Dispute</Radio>
                  <Radio value="discrimination">Discrimination</Radio>
                  <Radio value="other">Other</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormLabel fontSize="md" fontFamily="font.body">
              Complaint
            </FormLabel>
            <Textarea size="sm" placeholder="Write something..." mt="-0.5%" />
            <FormHelperText fontSize="xs" mt="-0.5%">
              Write your complaint here.
            </FormHelperText>
            <FormLabel fontSize="md" fontFamily="font.body">
              Person Involved
            </FormLabel>
            <Input
              size="sm"
              type="string"
              placeholder="Enter a Name"
              mt="-0.5%"
            />
            <FormHelperText fontSize="xs" mt="-0.5%">
              This will allow us to contact the person responsible for the
              complaint.
            </FormHelperText>
            <HStack>
              <FormLabel fontSize="md" fontFamily="font.body" w="20%">
                Date Submitted:
              </FormLabel>
              <Input
                w="30%"
                size="sm"
                type="date"
                placeholder="Enter a Title"
                mt="-0.5%"
              />
            </HStack>
          </Stack>
        </FormControl>
        <Button size="sm" type="submit" colorScheme="yellow" mt="2%">
          Submit
        </Button>
      </Box>
    </>
  );
}
