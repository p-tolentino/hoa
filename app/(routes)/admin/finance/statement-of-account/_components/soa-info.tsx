"use client";

import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

import SoaTableCategory from "./SoaTableCategory";
import SoaTableSummary from "./SoaTableSummary";
import { ExtendedUser } from "@/next-auth";
import { Property } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

interface SoaInfoProps {
  user: ExtendedUser;
  property: Property;
}

const SelectSchema = z.object({
  dueType: z.string(),
});

export const SoaInfo: React.FC<SoaInfoProps> = ({ user, property }) => {
  const hoaName = "ABC Homeowners' Association";

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      dueType: "all",
    },
  });

  const summarySoa = [
    {
      purpose: "Association Dues",
      debit: "6,000.00",
      credit: "6,000.00",
    },
    {
      purpose: "Dispute Fees",
      debit: "6,000.00",
      credit: "12,000.00",
    },
    {
      purpose: "Violation Fees",
      debit: "0.00",
      credit: "50.00",
    },
    {
      purpose: "Facility Reservation Fees",
      debit: "250.00",
      credit: "600.00",
    },
    {
      purpose: "Maintenance Fees",
      debit: "50.00",
      credit: "50.00",
    },
  ];
  const associationDues = [
    {
      status: "Paid",
      dateIssued: "01/01/2024",
      datePaid: "01/01/2024",
      description: "Association Due: Jan 2024",
      amount: "3,000.00",
    },
    {
      status: "Paid",
      dateIssued: "02/01/2024",
      datePaid: "02/01/2024",
      description: "Association Due: Feb 2024",
      amount: "3,000.00",
    },
  ];
  const disputeFees = [
    {
      status: "Paid",
      dateIssued: "02/01/2024",
      datePaid: "02/04/2024",
      description: "Dispute Settlement Amount",
      amount: "6,000.00",
    },
    {
      status: "Unpaid",
      dateIssued: "02/01/2024",
      datePaid: "",
      description: "Settlement Amount Balance",
      amount: "6,000.00",
    },
  ];
  const violationFees = [
    {
      status: "Unpaid",
      dateIssued: "01/29/2024",
      datePaid: "N/A",
      description: "Wrongful Parking",
      amount: "50.00",
    },
  ];
  const facilityReservations = [
    {
      status: "Paid",
      dateIssued: "02/02/2024",
      datePaid: "02/02/2024",
      description: "Basketball Court Reservation",
      amount: "250.00",
    },
    {
      status: "Unpaid",
      dateIssued: "02/01/2024",
      datePaid: "N/A",
      description: "Clubhouse Reservation",
      amount: "350.00",
    },
  ];
  const maintenanceFees = [
    {
      status: "Paid",
      dateIssued: "01/29/2024",
      datePaid: "01/30/2024",
      description: "Grass Cutting",
      amount: "50.00",
    },
  ];

  useEffect(() => {
    const type = form.getValues("dueType");
    console.log(type);
  }, [form.watch("dueType")]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Statement of Account`} description={`${hoaName}`} />
      </div>
      <Separator className="mt-4 mb-6" />

      {/* Homeowner Details */}
      <Flex justifyContent="space-between" fontFamily="fonts.body">
        <Flex>
          <Box mr="30px" mb="30px">
            <Text>Homeowner Name:</Text>
            <Text>Address:</Text>
          </Box>
          <Box>
            <Text fontWeight="semibold">{`${user.info.firstName} ${user.info.lastName}`}</Text>
            <Text fontWeight="semibold">{property.address}</Text>
          </Box>
        </Flex>
        <Flex>
          <Text mr="20px">Date Today:</Text>
          <Text fontWeight="semibold">{format(new Date(), "MM/dd/yyyy")}</Text>
        </Flex>
      </Flex>

      <VStack>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="dueType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Show All" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all" className="font-semibold">
                        Show All
                      </SelectItem>
                      <SelectItem value="assocDues">
                        Association Dues
                      </SelectItem>
                      <SelectItem value="dispute">Dispute Fines</SelectItem>
                      <SelectItem value="violation">Violation Fines</SelectItem>
                      <SelectItem value="facility">
                        Facility Reservation Fees
                      </SelectItem>
                      <SelectItem value="maintenance">
                        Maintenance Fees
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Box mt="15px">
          {/* SOA Summary Table */}
          {form.getValues("dueType") === "all" && (
            <SoaTableSummary data={summarySoa} />
          )}

          {form.getValues("dueType") === "assocDues" && (
            <SoaTableCategory data={associationDues} />
          )}
          {form.getValues("dueType") === "dispute" && (
            <SoaTableCategory data={disputeFees} />
          )}
          {form.getValues("dueType") === "violation" && (
            <SoaTableCategory data={violationFees} />
          )}
          {form.getValues("dueType") === "facility" && (
            <SoaTableCategory data={facilityReservations} />
          )}
          {form.getValues("dueType") === "maintenance" && (
            <SoaTableCategory data={maintenanceFees} />
          )}
        </Box>
      </VStack>
    </>
  );
};

export default SoaInfo;
