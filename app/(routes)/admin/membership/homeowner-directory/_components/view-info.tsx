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
  Avatar,
  HStack,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { HomeownerColumn } from "./columns";
import { PersonalInfo, Status } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FaUser as User } from "react-icons/fa";
import { getAddressById } from "@/server/actions/property";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { FaHouseUser as HouseMember } from "react-icons/fa6";
import { getHouseMembers } from "@/server/actions/user-info";
import Image from "next/image";

interface ViewInfoProps {
  data: HomeownerColumn;
}

export const ViewInfo: React.FC<ViewInfoProps> = ({ data }) => {
  const action = "Member Information";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [property, setProperty] = useState("");
  const [houseMembers, setHouseMembers] = useState<
    PersonalInfo[] | undefined
  >();

  useEffect(() => {
    getAddressById(data.address).then((data) => {
      if (data) {
        setProperty(data?.property?.address || "");
      }
    });

    getHouseMembers(data.address).then((data) => {
      if (data) {
        setHouseMembers(data?.users);
      }
    });
  }, []);

  return (
    <>
      <Button
        fontFamily="font.body"
        onClick={() => onOpen()}
        key={action}
        colorScheme="green"
        variant="ghost"
        size="sm"
      >
        {action}
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt="10px">
            <Heading size="md" fontFamily="font.heading">
              Member Information
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={5} paddingRight="20px" pb="2rem">
              <Box w="100%" h="100%" p="20px">
                <HStack>
                  <Avatar
                    size="2xl"
                    src={data.image || ""}
                    bg="yellow.500"
                    icon={<User />}
                  />
                  <Box ml="10px">
                    <Heading
                      size="lg"
                      fontFamily="font.heading"
                      className="capitalize"
                    >
                      {data.name}
                    </Heading>
                    <Box fontFamily="font.body">
                      <Text fontSize="24px">
                        {data.role} | {data.position}
                      </Text>
                      <Text fontSize="sm" lineHeight="0.5" mt="1rem">
                        Status:
                      </Text>
                      <Badge
                        className={cn(
                          "mt-2 text-xl",
                          data.status === Status.ACTIVE
                            ? "bg-green-700"
                            : data.status === Status.INACTIVE
                            ? "bg-red-700"
                            : data.status === Status.PENDING
                            ? "bg-yellow-600"
                            : "display-none"
                        )}
                      >
                        {data.status}
                      </Badge>
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
                    {data.bio || "-"}
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
                            {property}
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
                            {data.phoneNumber}
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
                            <a href={`mailto:${data.email}`} target="_blank">
                              {data.email}
                            </a>
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
                  <Text fontSize={"lg"} fontFamily={"font.body"} lineHeight={2}>
                    {/* {`${propertyInfo.occupants || ""}`} */}
                    <ScrollArea className="h-40 border rounded-md">
                      <div className="p-4">
                        {houseMembers?.length ? (
                          houseMembers?.map(
                            (member) =>
                              member.userId !== data.id && (
                                <div key={member.id}>
                                  <div className="flex justify-between">
                                    <div key={member.id} className="flex">
                                      <HouseMember className="mt-2 mr-2" />{" "}
                                      {`${member?.firstName} ${member?.lastName}`}
                                    </div>
                                    <div className="capitalize">
                                      {`${member?.relation?.toLowerCase()}`} (
                                      {`${member?.type}`})
                                    </div>
                                  </div>
                                  <Separator className="my-2" />
                                </div>
                              )
                          )
                        ) : (
                          <span className="text-gray-400">
                            No household members found.
                          </span>
                        )}
                      </div>
                    </ScrollArea>
                  </Text>
                </Box>
                <Box w="100%" h="100%" p="5">
                  <Heading size={"md"} fontFamily={"font.heading"}>
                    Government-Issued ID
                  </Heading>
                  <div className="p-4">
                    {data.govtId.length ? (
                      <div>
                        <Image
                          src={data.govtId}
                          alt="image"
                          width={2000}
                          height={2000}
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400">
                        No government ID uploaded yet.
                      </span>
                    )}
                  </div>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default ViewInfo;
