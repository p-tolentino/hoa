import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormField, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { NewBudgetPlanSchema } from "@/server/schemas";
import * as z from "zod";

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const RevenueTable = () => {
  const form = useFormContext<z.infer<typeof NewBudgetPlanSchema>>();
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const assocDues =
      parseFloat(form.getValues("cybAssocDues").toString()) || 0;
    const tollFees = parseFloat(form.getValues("cybToll").toString()) || 0;
    const facilityRent =
      parseFloat(form.getValues("cybFacility").toString()) || 0;
    const constructFees =
      parseFloat(form.getValues("cybConstruction").toString()) || 0;
    const carStickers =
      parseFloat(form.getValues("cybCarSticker").toString()) || 0;
    const otherRev = parseFloat(form.getValues("cybOtherRev").toString()) || 0;

    const totalRev =
      assocDues +
      tollFees +
      facilityRent +
      constructFees +
      carStickers +
      otherRev;

    setTotal(totalRev);
    form.setValue("cybTotalYearlyRev", totalRev);
  }, [
    [
      form.watch("cybAssocDues"),
      form.watch("cybToll"),
      form.watch("cybFacility"),
      form.watch("cybConstruction"),
      form.watch("cybCarSticker"),
      form.watch("cybOtherRev"),
    ],
  ]);

  return (
    <VStack mt="1rem">
      <Table variant="simple" size="xs" mt="20px" w="60vw">
        <Thead bgColor="brand.300">
          <Tr h="3rem">
            <Th p="1rem" fontSize="sm" fontFamily="font.heading">
              Revenue
            </Th>
            <Th p="1rem" fontSize="sm" fontFamily="font.heading" w="300px">
              Current Year Budget (CYB)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr fontFamily="font.body">
            <Td px="1rem">Association Dues</Td>
            <Td px="2rem">
              <FormField
                control={form.control}
                name="cybAssocDues"
                render={({ field }) => (
                  <>
                    <Input
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      value={field.value}
                      textAlign="right"
                    />
                    <FormMessage />
                  </>
                )}
              />
            </Td>
          </Tr>
          <Tr fontFamily="font.body">
            <Td px="1rem">Toll Fees</Td>
            <Td px="2rem">
              <FormField
                control={form.control}
                name="cybToll"
                render={({ field }) => (
                  <Input
                    type="number"
                    textAlign="right"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value}
                  />
                )}
              />
            </Td>
          </Tr>
          <Tr fontFamily="font.body">
            <Td px="1rem">Facility Rentals</Td>
            <Td px="2rem">
              <FormField
                control={form.control}
                name="cybFacility"
                render={({ field }) => (
                  <Input
                    type="number"
                    textAlign="right"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value}
                  />
                )}
              />
            </Td>
          </Tr>
          <Tr fontFamily="font.body">
            <Td px="1rem">Renovation and Demolition Fees</Td>
            <Td px="2rem">
              <FormField
                control={form.control}
                name="cybConstruction"
                render={({ field }) => (
                  <Input
                    type="number"
                    textAlign="right"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value}
                  />
                )}
              />
            </Td>
          </Tr>
          <Tr fontFamily="font.body">
            <Td px="1rem">Car Sticker Receipts</Td>
            <Td px="2rem">
              <FormField
                control={form.control}
                name="cybCarSticker"
                render={({ field }) => (
                  <Input
                    type="number"
                    textAlign="right"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value}
                  />
                )}
              />
            </Td>
          </Tr>
          <Tr fontFamily="font.body">
            <Td px="1rem">Other Revenues</Td>
            <Td px="2rem">
              <FormField
                control={form.control}
                name="cybOtherRev"
                render={({ field }) => (
                  <Input
                    type="number"
                    textAlign="right"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value}
                  />
                )}
              />
            </Td>
          </Tr>
          <Tr h="3rem" key="total" fontFamily="font.body" bg="brand.400">
            <Td px="1rem">Total Yearly Revenue</Td>
            <Td px="3rem" textAlign="right" fontSize="xl" fontWeight="bold">
              {total !== null ? `₱ ${formatNumber(total)}` : ""}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default RevenueTable;
