"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button, Flex, Input, Text, ButtonGroup } from "@chakra-ui/react";
import ExpenseTable from "./_components/expenses-table";
import RevenueTable from "./_components/revenue-table";
import TotalTable from "./_components/totals";
import { Separator } from "@/components/ui/separator";

// For Budget Plan Duration
import { CalendarIcon } from "@chakra-ui/icons";
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

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });

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
                Budget Plan Duration:
              </Text>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    size="sm"
                    variant={"outline"}
                    className={cn(
                      "w-[500px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "LLL dd, y")} -
                     ${format(date.to, "LLL dd, y")}`
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
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
