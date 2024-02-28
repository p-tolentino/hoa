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

import { Property, PropertyDocument } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ExtendedUser } from "@/next-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { FaHouseUser as HouseMember } from "react-icons/fa6";
import Link from "next/link";

interface MapViewInfoProps {
  properties: Property[];
  documents: PropertyDocument[];
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
  documents,
  users,
}) => {
  const { update } = useSession();
  const [occupants, setOccupants] = useState<ExtendedUser[] | undefined>();
  const [propertyDocuments, setDocuments] = useState<
    PropertyDocument[] | undefined
  >();

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

    const docus = documents.filter((propDoc) => {
      return propDoc.propertyId === address;
    });

    if (docus) {
      setDocuments(docus);
    } else {
      setDocuments([]);
    }
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
          Insert Google Map here
        </Center>
        <Box fontFamily={"font.body"}>
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
              <Heading size={"md"} fontFamily={"font.heading"}>
                Household Members
              </Heading>
              <Text fontSize={"lg"} fontFamily={"font.body"} lineHeight={2}>
                <ScrollArea className="h-40 border rounded-md">
                  <div className="p-4">
                    {occupants?.length !== 0 ? (
                      occupants?.map((occupant) => (
                        <>
                          <div key={occupant.id} className="flex">
                            <HouseMember className="mt-2 mr-2" />{" "}
                            {`${occupant?.info?.firstName} ${occupant?.info?.lastName}`}
                          </div>
                          <Separator className="my-2" />
                        </>
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
            <Box>
              <Heading size={"md"} fontFamily={"font.heading"}>
                Occupancy Status
              </Heading>
              <Text
                fontSize={"lg"}
                fontFamily={"font.body"}
                lineHeight={2}
                fontWeight="800"
                className={cn(
                  occupants && occupants?.length > 0
                    ? "text-green-700"
                    : occupants?.length === 0
                    ? "text-orange-500"
                    : "text-black"
                )}
              >
                {occupants && occupants?.length > 0
                  ? "Occupied"
                  : occupants?.length === 0
                  ? "Vacant"
                  : "-"}
              </Text>
            </Box>
            <Box>
              <Heading size={"md"} fontFamily={"font.heading"} mb={"1rem"}>
                Property Documents
              </Heading>
              <div className="flex flex-col gap-2">
                {propertyDocuments?.length !== 0 ? (
                  requiredDocs.map((doc) => {
                    const propDoc = propertyDocuments?.find((item) => {
                      return item.fileName === doc.title;
                    });

                    return (
                      <Link
                        key={doc.title}
                        rel="noopener noreferrer"
                        target="_blank"
                        href={propDoc?.imageUrl || "#"}
                        className={cn(
                          "flex items-center w-[45%] gap-x-1 hover:underline hover:underline-offset-4",
                          !propDoc?.imageUrl &&
                            "pointer-events-none text-gray-300"
                        )}
                      >
                        • {doc.title}
                        <ExternalLinkIcon mx={"2px"} />
                      </Link>
                    );
                  })
                ) : (
                  <span className="text-gray-400">
                    No existing documents uploaded.
                  </span>
                )}
              </div>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </div>
  );
};
