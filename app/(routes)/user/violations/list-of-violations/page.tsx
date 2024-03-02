"use client";

import { Separator } from "@/components/ui/separator";
import {
  Box,
  Heading,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function listOfViolations() {
  const title = "List of Common Association Violations";
  const description =
    "View the list of common violations in a homeowners association.";
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
        mb="1%"
      >
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "purple.200" }}>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily="font.heading"
                >
                  Parking
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="font.body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "pink.200" }}>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily="font.heading"
                >
                  Smoking
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="font.body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.200" }}>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily="font.heading"
                >
                  Landscaping
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="font.body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "orange.200" }}>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily="font.heading"
                >
                  Garbage
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="font.body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.200" }}>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily="font.heading"
                >
                  Noise
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="font.body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}
export default listOfViolations;
