"use client";

import { EditIcon } from "@chakra-ui/icons";
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
  Spacer,
} from "@chakra-ui/react";

function LGUHotlines() {
  const title = "Emergency Hotline Numbers";
  const description = "Edit the list of emergency hotline numbers.";

  const data = [
    {
      agency: "Emergency 911 National Office",
      hotline: "911",
      directline:
        "(02) 925-9111 (02) 928-7281 [telefax] +63966-5000-299 [Globe] +63932-318-0440 [Smart]",
      area: "NCR",
    },
    {
      agency: "Emergency 911 National Office",
      hotline: "911",
      directline:
        "(02) 925-9111 (02) 928-7281 [telefax] +63966-5000-299 [Globe] +63932-318-0440 [Smart]",
      area: "NCR",
    },
    {
      agency: "Emergency 911 National Office",
      hotline: "911",
      directline:
        "(02) 925-9111 (02) 928-7281 [telefax] +63966-5000-299 [Globe] +63932-318-0440 [Smart]",
      area: "NCR",
    },
  ];
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
            <HStack>
              <Stack spacing="-5%">
                <Heading size="md" fontFamily="font.heading">
                  {title}
                </Heading>
                <Text fontSize="xs">{description}</Text>
              </Stack>
              <Spacer />
              <Button variant="outline" size="sm" mr="5%">
                <EditIcon />
              </Button>
            </HStack>
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
                      {data.map((data) => (
                        <Tr fontFamily="font.body" fontSize="xs">
                          <Td>{data.agency}</Td>
                          <Td>{data.hotline}</Td>
                          <Td>{data.directline}</Td>
                          <Td>{data.area}</Td>
                        </Tr>
                      ))}
                      <Tr fontFamily="font.body" fontSize="xs">
                        <Td>Bureau of Fire Protection</Td>
                        <Td></Td>
                        <Td>
                          (02) 426-0219 <br />
                          (02) 426-3812 <br />
                          (02)426-0246
                        </Td>
                        <Td>NCR</Td>
                      </Tr>
                      <Tr fontFamily="font.body" fontSize="xs">
                        <Td>Philippine National Police</Td>
                        <Td></Td>
                        <Td>
                          (2) 722-0650 <br />
                          +63917-847-5757
                        </Td>
                        <Td>NCR</Td>
                      </Tr>
                      <Tr fontFamily="font.body" fontSize="xs">
                        <Td>Red Cross</Td>
                        <Td>911</Td>
                        <Td>
                          (2) 722-0650 <br />
                          +63917-847-5757
                        </Td>
                        <Td>NCR</Td>
                      </Tr>
                      <Tr fontFamily="font.body" fontSize="xs">
                        <Td>Philippine National Police</Td>
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
