"use client";

import * as z from "zod";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  UnorderedList,
  Link,
  VStack,
  Text,
  ListItem,
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

interface MapViewInfoProps {
  properties: Property[];
  users: ExtendedUser[];
}

const SelectSchema = z.object({
  address: z.string(),
});

export const MapViewInfo: React.FC<MapViewInfoProps> = ({
  properties,
  users,
}) => {
  const { update } = useSession();
  const [occupants, setOccupants] = useState<ExtendedUser[] | undefined>();

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      address: "-",
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
    form.reset();
    // TODO: Include documents
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
                {/* {`${propertyInfo.occupants || ""}`} */}
                <ScrollArea className="h-40 border rounded-md">
                  <div className="p-4">
                    {occupants?.length !== 0 ? (
                      occupants?.map((occupant) => (
                        <>
                          <div key={occupant.id} className="flex">
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
              <UnorderedList spacing={2} fontFamily={"font.body"}>
                <ListItem>
                  <Link isExternal>
                    Intent to Purchase or Letter of Intent{" "}
                    <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link isExternal>
                    Reservation Letter <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link isExternal>
                    Contract to Sell <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link isExternal>
                    Letter of Guarantee <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link isExternal>
                    Deed of Absolute Sale <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link isExternal>
                    Certification of Title <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link isExternal>
                    Tax Declaration <ExternalLinkIcon mx={"2px"} />
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </div>
  );
};
