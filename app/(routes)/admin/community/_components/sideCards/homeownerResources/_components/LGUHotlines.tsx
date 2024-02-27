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
} from "@chakra-ui/react";

function LGUHotlines() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="link"
        fontFamily="font.body"
        fontWeight="light"
        onClick={() => onOpen()}
        key="LGUHotlines"
        color="black"
        size="sm"
      >
        LGU Hotlines
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt="10px">
            <Heading size="md" fontFamily="font.heading">
              LGU Hotlines
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={5} paddingRight="20px" pb="2rem">
              <Box w="100%" h="100%" p="20px">
                <HStack>
                  <Box ml="10px">
                    <Heading
                      size="lg"
                      fontFamily="font.heading"
                      className="capitalize"
                    >
                      asd
                    </Heading>
                    <Box fontFamily="font.body">
                      <Text fontSize="24px">asd</Text>
                      <Text fontSize="sm" lineHeight="0.5" mt="1rem">
                        Status:
                      </Text>
                    </Box>
                  </Box>
                </HStack>
              </Box>

              <Box w="100%" h="100%" px="10px">
                <Box w="100%" h="100%" p="5">
                  <Heading size="md" fontFamily={"font.heading"} mb={"1rem"}>
                    Biography
                  </Heading>
                  <Text fontFamily="font.body" textAlign="justify">
                    asd
                  </Text>
                </Box>

                <Box w="100%" h="100%" p="5">
                  <Heading size="md" fontFamily={"font.heading"} mb={"1rem"}>
                    Personal Information
                  </Heading>
                  <Text>
                    <Table>
                      <Tbody>
                        <Tr fontFamily="font.body">
                          <Td
                            px={3}
                            py={1}
                            fontFamily="font.body"
                            style={{ fontWeight: "bold" }}
                          >
                            House No. & Street:
                          </Td>
                          <Td px={0} py={1} fontFamily="font.body">
                            asd
                          </Td>
                        </Tr>
                        <Tr fontFamily="font.body">
                          <Td
                            px={3}
                            py={1}
                            fontFamily="font.body"
                            style={{ fontWeight: "bold" }}
                          >
                            Contact Number
                          </Td>
                          <Td px={0} py={1} fontFamily="font.body">
                            asd
                          </Td>
                        </Tr>
                        <Tr fontFamily="font.body">
                          <Td
                            px={3}
                            py={1}
                            fontFamily="font.body"
                            style={{ fontWeight: "bold" }}
                          >
                            Email Address
                          </Td>
                          <Td px={0} py={1} fontFamily="font.body">
                            asd
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Text>
                </Box>
                <Box w="100%" h="100%" p="5">
                  <Heading size={"md"} fontFamily={"font.heading"}>
                    Other Household Members
                  </Heading>
                  <Text
                    fontSize={"lg"}
                    fontFamily={"font.body"}
                    lineHeight={2}
                  ></Text>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default LGUHotlines;
