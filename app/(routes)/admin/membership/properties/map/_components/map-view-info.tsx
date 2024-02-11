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

interface MapViewInfoProps {
  data: Property[];
}

const SelectSchema = z.object({
  address: z.string(),
});

export const MapViewInfo: React.FC<MapViewInfoProps> = ({ data }) => {
  const { update } = useSession();
  const [propertyInfo, setPropertyInfo] = useState({
    occupant: "-",
    status: "-",
    userId: "-",
  });

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      address: "-",
    },
  });

  useEffect(() => {
    const address = form.getValues("address");
    data.filter((property) => {
      if (property.address === address) {
        setPropertyInfo({
          occupant: property.occupantName || "-",
          status: property.userId !== "" ? "Occupied" : "Vacant",
          userId: property.userId || "",
        });
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
                        {data.map((property) => {
                          return (
                            <SelectItem
                              key={property.id}
                              value={property.address || ""}
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
                Property Owner
              </Heading>
              <Text fontSize={"lg"} fontFamily={"font.body"} lineHeight={2}>
                {`${propertyInfo.occupant || ""}`}
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
                  propertyInfo?.status === "Occupied"
                    ? "text-orange-500"
                    : "text-green-700"
                )}
              >
                {propertyInfo.status}
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
                    Tax Decleration <ExternalLinkIcon mx={"2px"} />
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
