"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button, Flex, Input, Text, ButtonGroup, MenuButton, Menu, Box, MenuList, MenuItem } from "@chakra-ui/react";
import ExpenseTable from "./_components/expenses-table";
import RevenueTable from "./_components/revenue-table";
import TotalTable from "./_components/totals";
import { Separator } from "@/components/ui/separator";

// For Budget Plan Duration
import { CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import { NewBudgetPlanSchema } from "@/server/schemas";
import { Form, FormField } from "@/components/ui/form";
import { createBudgetPlan } from "@/server/actions/budget-plan";

import { toast } from "sonner";

type BudgetFormValues = z.infer<typeof NewBudgetPlanSchema>;

export default function CreateBudgetPlan() {
  const router = useRouter();
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [selectedYear, setSelectedYear] = useState('');

// Example range of years - adjust this as needed
const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() + i);

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(NewBudgetPlanSchema),
    defaultValues: {
      title: "",
      forYear: new Date().getFullYear(),
      cybAssocDues: 0,
      cybToll: 0,
      cybFacility: 0,
      cybConstruction: 0,
      cybCarSticker: 0,
      cybOtherRev: 0,

      cybSalariesBenefits: 0,
      cybUtilities: 0,
      cybOfficeSupplies: 0,
      cybRepairMaintenance: 0,
      cybDonations: 0,
      cybFurnituresFixtures: 0,
      cybRepresentation: 0,
      cybLegalProfessionalFees: 0,
      cybAdministrativeCosts: 0,
      cybOtherExp: 0,

      cybTotalYearlyRev: 0,
      cybTotalYearlyExp: 0,
      cybTotalYearlySurplus: 0,
    },
  });

  const onSubmit = async (values: BudgetFormValues) => {
    startTransition(() => {
      createBudgetPlan(values)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            toast.error(`${data.error}`, {
              description:
                "There is already an existing budget plan for the year.",
              action: {
                label: "View Budget Plans",
                onClick: () => router.push(`/admin/finance/budget-planning`),
              },
            });
          }

          if (data.success) {
            update();
            setOpen(false);
            form.reset();
            router.push(`/admin/finance/budget-planning`);
            console.log(data.success);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading
          title="Create Budget Plan"
          description="Enter the organization's revenue, funds, and expenses. Make sure to review the totals table at the bottom before submitting."
        />
      </Flex>
      <Separator className="mt-2 mb-5" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Flex w="100%" mt="3rem" justifyContent="center">
            {/* Budget Plan Title  */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  w="30%"
                  mr="5rem"
                  type="string"
                  size="md"
                  fontWeight="bold"
                  placeholder="Budget Plan Title"
                  {...field}
                />
              )}
            />

            {/* Budget Plan Duration */}
            <Flex alignItems="center">
      <Text
        fontSize="sm"
        w="180px"
        fontFamily="font.heading"
        fontWeight="semibold"
      >
        Budget Plan Year:
      </Text>
      <Box w="500px">

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm" variant="outline" w="full" textAlign="left">
            {selectedYear || 'Pick a year'}
          </MenuButton>
          <MenuList maxHeight="300px" overflowY="auto">
            {years.map((year) => (
              <MenuItem key={year} 
              onClick={() => {
                setSelectedYear(year.toString())
                form.setValue('forYear', year);
                }}>
                {year}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

  
      </Box>
    </Flex>
          </Flex>

          {/* Budget Planning Table */}
          <RevenueTable />
          <ExpenseTable />
          <TotalTable />

          <div className="flex justify-end pr-24">
            <ButtonGroup>
              {/* Cancel Button */}
              <Button
                size="sm"
                colorScheme="gray"
                as={Link}
                href="/admin/finance/budget-planning"
              >
                Cancel
              </Button>
              {/* Save Button */}
              <Button size="sm" colorScheme="green" type="submit">
                Create Budget Plan
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </Form>
    </>
  );
}
