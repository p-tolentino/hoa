"use client";

import * as z from "zod";
import React from "react";
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

import { Box, Flex, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { format } from "date-fns";

import SoaTableCategory from "./SoaTableCategory";
import SoaTableSummary from "./SoaTableSummary";
import { ExtendedUser } from "@/next-auth";
import { PaymentStatus, Property, UserTransaction } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PDFTable from "@/components/system/PDFTable";
import BackButton from "@/components/system/BackButton";

interface SoaInfoProps {
  user: ExtendedUser;
  property: Property;
  transactions: UserTransaction[];
  allUsers: ExtendedUser[];
}

const SelectSchema = z.object({
  dueType: z.string(),
});

export const SoaInfo: React.FC<SoaInfoProps> = ({
  user,
  property,
  transactions,
  allUsers,
}) => {
  const componentPDF = useRef<HTMLDivElement | null>(null);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: "Admin Directory Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  const form = useForm<z.infer<typeof SelectSchema>>({
    defaultValues: {
      dueType: "all",
    },
  });

  const assocDues = transactions.filter((transaction) => {
    if (transaction.purpose === "Association Dues") {
      return transaction;
    }
  });

  const disputeFees = transactions.filter((transaction) => {
    if (transaction.purpose === "Dispute Fees") {
      return transaction;
    }
  });

  const violationFees = transactions.filter((transaction) => {
    if (transaction.purpose === "Violation Fines") {
      return transaction;
    }
  });

  const facilityFees = transactions.filter((transaction) => {
    if (transaction.purpose === "Facility Rentals") {
      return transaction;
    }
  });

  const maintenanceFees = transactions.filter((transaction) => {
    if (transaction.purpose === "Repair and Maintenance") {
      return transaction;
    }
  });

  const summary = [{}];

  const summarySoa = [
    {
      purpose: "Association Dues",
      debit: (() => {
        let paidSum = 0;

        assocDues.forEach((fee) => {
          if (fee.status === PaymentStatus.PAID) {
            paidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return paidSum;
      })(),
      credit: (() => {
        let unpaidSum = 0;

        assocDues.forEach((fee) => {
          if (
            fee.status === PaymentStatus.UNPAID ||
            fee.status === PaymentStatus.OVERDUE
          ) {
            unpaidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return unpaidSum;
      })(),
    },
    // {
    //   purpose: "Dispute Fees",
    //   debit: (() => {
    //     let paidSum = 0;

    //     disputeFees.forEach((fee) => {
    //       if (fee.status === PaymentStatus.PAID) {
    //         paidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
    //       }
    //     });

    //     return paidSum;
    //   })(),
    //   credit: (() => {
    //     let unpaidSum = 0;

    //     disputeFees.forEach((fee) => {
    //       if (
    //         fee.status === PaymentStatus.UNPAID ||
    //         fee.status === PaymentStatus.OVERDUE
    //       ) {
    //         unpaidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
    //       }
    //     });

    //     return unpaidSum;
    //   })(),
    // },
    {
      purpose: "Violation Fees",
      debit: (() => {
        let paidSum = 0;

        violationFees.forEach((fee) => {
          if (fee.status === PaymentStatus.PAID) {
            paidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return paidSum;
      })(),
      credit: (() => {
        let unpaidSum = 0;

        violationFees.forEach((fee) => {
          if (
            fee.status === PaymentStatus.UNPAID ||
            fee.status === PaymentStatus.OVERDUE
          ) {
            unpaidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return unpaidSum;
      })(),
    },
    {
      purpose: "Facility Reservation Fees",
      debit: (() => {
        let paidSum = 0;

        facilityFees.forEach((fee) => {
          if (fee.status === PaymentStatus.PAID) {
            paidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return paidSum;
      })(),
      credit: (() => {
        let unpaidSum = 0;

        facilityFees.forEach((fee) => {
          if (
            fee.status === PaymentStatus.UNPAID ||
            fee.status === PaymentStatus.OVERDUE
          ) {
            unpaidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return unpaidSum;
      })(),
    },
    {
      purpose: "Maintenance Service Fees",
      debit: (() => {
        let paidSum = 0;

        maintenanceFees.forEach((fee) => {
          if (fee.status === PaymentStatus.PAID) {
            paidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return paidSum;
      })(),
      credit: (() => {
        let unpaidSum = 0;

        maintenanceFees.forEach((fee) => {
          if (
            fee.status === PaymentStatus.UNPAID ||
            fee.status === PaymentStatus.OVERDUE
          ) {
            unpaidSum += parseFloat(fee.amount.toString().replace(/,/g, ""));
          }
        });

        return unpaidSum;
      })(),
    },
  ];

  useEffect(() => {}, [form.watch("dueType")]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Statement of Account`}
          description="ABC Homeowners' Association"
        />
        <HStack>
          <Button size="sm" colorScheme="yellow" onClick={generatePDF}>
            Generate PDF
          </Button>
          <BackButton />
        </HStack>
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
                      <SelectItem value="Association Dues">
                        Association Dues
                      </SelectItem>
                      {/* <SelectItem value="Dispute Fees">Dispute Fees</SelectItem> */}
                      <SelectItem value="Violation Fines">
                        Violation Fines
                      </SelectItem>
                      <SelectItem value="Facility Rentals">
                        Facility Reservation Fees
                      </SelectItem>
                      <SelectItem value="Repair and Maintenance">
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
          {/* <div className="hidden">
            <div ref={componentPDF} style={{ width: "100%" }}>
              <PDFTable />
            </div>
          </div> */}
          <div ref={componentPDF} style={{ width: "100%" }}>
            {/* SOA Summary Table */}
            {form.getValues("dueType") === "all" && (
              <SoaTableSummary
                data={summarySoa}
                transactionsToUpdate={transactions}
              />
            )}

            {form.getValues("dueType") === "Association Dues" && (
              <SoaTableCategory data={assocDues} users={allUsers} />
            )}
            {/* {form.getValues("dueType") === "Dispute Fees" && (
            <SoaTableCategory data={disputeFees} users={allUsers} />
          )} */}
            {form.getValues("dueType") === "Violation Fines" && (
              <SoaTableCategory data={violationFees} users={allUsers} />
            )}
            {form.getValues("dueType") === "Facility Rentals" && (
              <SoaTableCategory data={facilityFees} users={allUsers} />
            )}
            {form.getValues("dueType") === "Repair and Maintenance" && (
              <SoaTableCategory data={maintenanceFees} users={allUsers} />
            )}
          </div>
        </Box>
      </VStack>
    </>
  );
};

export default SoaInfo;
