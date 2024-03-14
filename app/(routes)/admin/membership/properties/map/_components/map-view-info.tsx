"use client";

import * as z from "zod";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Property } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ExtendedUser } from "@/next-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { FaHouseUser as HouseMember } from "react-icons/fa6";
import Link from "next/link";
import GMapView from "./gmap";

interface MapViewInfoProps {
  properties: Property[];
  users: ExtendedUser[];
}

const SelectSchema = z.object({
  address: z.string(),
});

const requiredDocs = [
  {
    title: "Intent to Purchase or Letter of Intent",
  },
  {
    title: "Reservation Letter",
  },
  {
    title: "Contract to Sell",
  },
  {
    title: "Letter of Guarantee",
  },
  {
    title: "Deed of Absolute Sale",
  },
  {
    title: "Certification of Title",
  },
  {
    title: "Tax Declaration",
  },
];

export const MapViewInfo: React.FC<MapViewInfoProps> = ({
  properties,
  users,
}) => {
  const { update } = useSession();
  const [occupants, setOccupants] = useState<ExtendedUser[] | undefined>();

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      address: "",
    },
  });

  useEffect(() => {
    const address = form.getValues("address");
    properties.filter((property) => {
      if (property.id === address) {
        const houseMembers = users.filter((user) => {
          return property.id === user?.info?.address;
        });

        if (houseMembers) {
          setOccupants(houseMembers);
        } else {
          setOccupants([]);
        }
      }
    });
  }, [form.watch("address")]);

  return (
    <div className="p-10">
      <SimpleGrid
        columns={2}
        spacing={10}
        justifyContent="space-around"
        h={"70vh"}
        minChildWidth={{ md: "50vh", lg: "20vh" }}
      >
        <Center bg="lightgrey" minHeight={"200px"} className="rounded-xl">
          <GMapView
            properties={properties}
            selectedProperty={form.watch("address")}
            users={users}
          />
        </Center>
        <Box>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please select a house address:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select address" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {properties.map((property) => {
                          return (
                            <SelectItem
                              key={property.id}
                              value={property.id || ""}
                            >
                              {property.address}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <VStack
            borderWidth={"1px"}
            borderRadius={"lg"}
            p="2rem"
            alignItems={"left"}
            spacing={"2rem"}
          >
            <Box>
              <Heading size={"sm"} fontFamily={"font.heading"}>
                Household Members
              </Heading>
              <Text fontSize={"sm"} fontFamily={"font.body"} lineHeight={2}>
                <ScrollArea className="h-40 border rounded-md">
                  <div className="p-4">
                    {occupants?.length !== 0 ? (
                      occupants?.map((occupant) => (
                        <div key={occupant.id}>
                          <div className="flex justify-between">
                            <div key={occupant.id} className="flex">
                              <HouseMember className="mt-2 mr-2" />{" "}
                              {`${occupant?.info?.firstName} ${occupant?.info?.lastName}`}
                            </div>
                            <div className="capitalize">
                              {`${occupant?.info?.relation.toLowerCase()}`} (
                              {`${occupant?.info?.type}`})
                            </div>
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">
                        No household members found.
                      </span>
                    )}
                  </div>
                </ScrollArea>
              </Text>
            </Box>
            <Box className="flex justify-between">
              <Box>
                <Heading size={"sm"} fontFamily={"font.heading"}>
                  Occupancy Status
                </Heading>
                <Text
                  fontSize={"md"}
                  fontFamily={"font.body"}
                  lineHeight={2}
                  fontWeight="800"
                  className={cn(
                    occupants && occupants?.length > 0
                      ? "text-orange-500"
                      : occupants?.length === 0
                      ? "text-green-700"
                      : "text-gray-500"
                  )}
                >
                  {occupants && occupants?.length > 0
                    ? "Occupied"
                    : occupants?.length === 0
                    ? "Vacant"
                    : "-"}
                </Text>
              </Box>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </div>
  );
};
