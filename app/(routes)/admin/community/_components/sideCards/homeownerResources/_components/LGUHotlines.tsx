"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Box,
  Text,
  Stack,
  HStack,
  Table,
  Tbody,
  Tr,
  Td,
  Link,
  Thead,
  Th,
  TableContainer,
} from "@chakra-ui/react";

function LGUHotlines() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        variant="link"
        fontFamily="font.body"
        fontWeight="light"
        onClick={() => onOpen()}
        key="LGUHotlines"
        color="black"
        size="sm"
      >
        Emergency Hotline Numbers
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt="10px">
            <Heading size="md" fontFamily="font.heading">
              Emergency Hotline Numbers
            </Heading>
            <Text fontSize="xs">
              View the list of emergency hotline numbers.
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={5} paddingRight="20px" pb="2rem">
              <Box w="100%" h="100%" p="5">
                <TableContainer>
                  <Table colorScheme="blue">
                    <Thead>
                      <Th fontFamily="font.heading">Agency</Th>
                      <Th fontFamily="font.heading">Hotline</Th>
                      <Th fontFamily="font.heading">Direct Line</Th>
                      <Th fontFamily="font.heading">Area</Th>
                    </Thead>
                    <Tbody>
                      <Tr fontFamily="font.body">
                        <Td>
                          Emergency 911
                          <br /> National Office
                        </Td>
                        <Td>911</Td>
                        <Td>
                          (02) 925-9111 <br />
                          (02) 928-7281 [telefax] <br />
                          +63966-5000-299 [Globe] <br />
                          +63932-318-0440 [Smart]
                        </Td>
                        <Td>NCR</Td>
                      </Tr>
                      <Tr fontFamily="font.body">
                        <Td>
                          Bureau of <br />
                          Fire Protection
                        </Td>
                        <Td>911</Td>
                        <Td>
                          (02) 426-0219 <br />
                          (02) 426-3812 <br />
                          (02)426-0246
                        </Td>
                        <Td>NCR</Td>
                      </Tr>
                      <Tr fontFamily="font.body">
                        <Td>
                          Philippine National <br />
                          Police
                        </Td>
                        <Td>911</Td>
                        <Td>
                          (2) 722-0650 <br />
                          +63917-847-5757
                        </Td>
                        <Td>NCR</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default LGUHotlines;
