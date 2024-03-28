"use client";

import { ExtendedUser } from "@/next-auth";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  Spinner,
  Button,
} from "@chakra-ui/react";

import { Heading as HeadingShad } from "@/components/ui/heading";

import { PersonalInfo, Property, Status, Vehicle } from "@prisma/client";
import { LuFileEdit as Edit, LuCar as Car } from "react-icons/lu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getHouseMembers } from "@/server/actions/user-info";
import { FaHouseUser as HouseMember } from "react-icons/fa6";

interface UserInfoProps {
  user: ExtendedUser;
  info: PersonalInfo;
  vehicles: Vehicle[];
  property: Property;
}

const UserInfo: React.FC<UserInfoProps> = ({
  user,
  info,
  vehicles,
  property,
}) => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [houseMembers, setHouseMembers] = useState<
    PersonalInfo[] | undefined
  >();

  useEffect(() => {
    startTransition(() => {
      update();

      getHouseMembers(user?.info?.address).then((data) => {
        if (data) {
          setHouseMembers(data?.users);
        }
      });
    });
  }, []);

  return isPending ? (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Spinner />
    </Flex>
  ) : (
    <Box zIndex={1}>
      <HeadingShad title="My Profile" description="View your profile" />
      <Separator className="mt-4 mb-6" />
      <Flex
        justifyContent={"space-between"}
        flexDir={{ md: "column", lg: "row" }}
      >
        {/* Profile Information */}
        <Flex gap="1.5rem">
          <Avatar size="2xl" src={user?.image || ""} />
          <Box mb={{ md: "2rem", lg: "0" }}>
            <Heading
              size="lg"
              fontFamily={"font.heading"}
              className="capitalize"
            >
              {`${info.firstName} ${info.lastName}`}
            </Heading>
            <Box fontFamily={"font.body"}>
              <Text fontSize={"24px"}>{info.position}</Text>

              <Text fontSize={"sm"} lineHeight={0.5} mt="1rem">
                Status:
              </Text>
              <Badge
                className={cn(
                  "mt-2 text-xl",
                  user.status === Status.ACTIVE
                    ? "bg-green-700"
                    : user.status === Status.INACTIVE
                    ? "bg-red-700"
                    : user.status === Status.PENDING
                    ? "bg-yellow-600"
                    : "display-none"
                )}
              >
                {user.status}
              </Badge>
            </Box>
          </Box>
        </Flex>
        <Link href="/user/settings">
          <Button colorScheme="yellow" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </Link>
      </Flex>
      <SimpleGrid
        columns={2}
        mt="3rem"
        spacing={{ md: "2.5rem", lg: "5rem" }}
        minChildWidth={{ md: "35vw", lg: "20vw" }}
      >
        {/* Biography */}
        <Box>
          <Heading size="md" fontFamily={"font.heading"} mb={"1rem"}>
            Biography
          </Heading>
          <Text fontFamily={"font.body"}>{info.bio ? info.bio : "-"}</Text>
        </Box>

        {/* Personal Information */}
        <Box mb={{ md: "3rem", lg: "0" }}>
          <Heading size="md" fontFamily={"font.heading"} mb={"1rem"}>
            Personal Information
          </Heading>
          <TableContainer>
            <Table w="35vw">
              <Tbody>
                <Tr>
                  <Td px={0} py={2} style={{ fontWeight: "bold" }}>
                    House No. & Street
                  </Td>
                  <Td px={0} py={2}>
                    {property.address}
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} style={{ fontWeight: "bold" }}>
                    Contact Number
                  </Td>
                  <Td px={0} py={2}>
                    {info.phoneNumber}
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} style={{ fontWeight: "bold" }}>
                    Email Address
                  </Td>
                  <Td px={0} py={2}>
                    {user.email}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        mt="3rem"
        spacing={{ md: "2.5rem", lg: "5rem" }}
        minChildWidth={{ md: "35vw", lg: "20vw" }}
      >
        {/* Biography */}
        <Box></Box>

        {/* Personal Information */}

        <Box mb={{ md: "3rem", lg: "0" }}>
          <ScrollArea className="w-10/12 mb-5 border rounded-md h-72">
            <div className="p-4">
              <h4 className="mb-4 text-lg font-bold leading-none">
                Other Household Members
              </h4>
              {houseMembers?.length ? (
                houseMembers?.map(
                  (member) =>
                    member.userId !== user?.id && (
                      <>
                        <div className="flex justify-between">
                          <div key={member.id} className="flex">
                            <HouseMember className="mt-2 mr-2" />{" "}
                            {`${member?.firstName} ${member?.lastName}`}
                          </div>
                          <div className="capitalize">{`${member?.relation?.toLowerCase()}`}</div>
                        </div>
                        <Separator className="my-2" />
                      </>
                    )
                )
              ) : (
                <span className="text-gray-400">
                  No household members found.
                </span>
              )}
            </div>
          </ScrollArea>
          <ScrollArea className="w-10/12 border rounded-md h-72">
            <div className="p-4">
              <h4 className="mb-4 text-lg font-bold leading-none">
                Vehicles Owned
              </h4>
              {vehicles.length ? (
                vehicles.map((vehicle) => (
                  <>
                    <div key={vehicle.id} className="flex">
                      <Car className="w-5 h-5 pt-1 mr-2" />
                      {vehicle.plateNum}
                    </div>
                    <Separator className="my-2" />
                  </>
                ))
              ) : (
                <div className="italic text-gray-400">
                  No vehicles recorded.
                </div>
              )}
            </div>
          </ScrollArea>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserInfo;
