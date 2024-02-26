"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  createTransaction,
  updateFunds,
} from "@/server/actions/hoa-transaction";

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import {
  Form,
  FormControl as ShadControl,
  FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { NewTransactionSchema } from "@/server/schemas";
import { HoaTransaction } from "@prisma/client";

type TransactionFormValues = z.infer<typeof NewTransactionSchema>;

interface NewTransactionFormProps {
  onSuccess: () => void;
  currentFunds: number;
  initialData?: HoaTransaction;
}

export default function NewTransactionForm({
  onSuccess,
  currentFunds,
  initialData,
}: NewTransactionFormProps) {
  const router = useRouter();
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(NewTransactionSchema),
    defaultValues: {
      dateIssued: initialData?.dateIssued
        ? new Date(initialData?.dateIssued)?.toISOString().split("T")[0]
        : undefined,
      type: initialData?.type || undefined,
      purpose: initialData?.purpose || undefined,
      amount: initialData?.amount.toString() || undefined,
      description: initialData?.description || undefined,
    },
  });

  const onSubmit = async (values: TransactionFormValues) => {
    startTransition(() => {
      createTransaction(values)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }

          if (data.success) {
            if (values.type === "REVENUE") {
              var newFund = currentFunds + parseInt(values.amount, 10);
              updateFunds(newFund);
              console.log(newFund);
            } else {
              var newFund = currentFunds - parseInt(values.amount, 10);
              updateFunds(newFund);
              console.log(newFund);
            }
            update();
            setOpen(false);
            form.reset();
            router.refresh();
            console.log(data.success);
            onSuccess();
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="dateIssued"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormControl
                isRequired
                fontFamily={"font.body"}
                isInvalid={form.formState.errors.dateIssued ? true : false}
              >
                <FormLabel>Date issued:</FormLabel>
                <Input type="date" {...field} />
                {form.formState.errors.dateIssued && (
                  <FormErrorMessage>
                    {form.formState.errors.dateIssued.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </FormItem>
          )}
        />

        {/* Transaction Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormControl isRequired fontFamily={"font.body"} mt="25px">
              <FormLabel>Transaction Type:</FormLabel>
              <RadioGroup {...field} colorScheme="yellow">
                <Stack direction={"row"} spacing={5}>
                  <Radio value="REVENUE">Revenue</Radio>
                  <Radio value="EXPENSE">Expense</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          )}
        />

        {/* Purpose */}
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormControl isRequired fontFamily={"font.body"} mt="25px">
              <FormLabel>Purpose:</FormLabel>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                onChange={field.onChange}
                value={field.value || ""}
                disabled={isPending || !form.watch("type")}
              >
                {form.watch("type") === "REVENUE" ? (
                  <>
                    <option value="Association Dues">Association Dues</option>
                    <option value="Toll Fees">Toll Fees</option>
                    <option value="Facility Rentals">Facility Rentals</option>
                    <option value="Renovation and Demolition Fees">
                      Renovation and Demolition Fees
                    </option>
                    <option value="Car Sticker Receipts">
                      Car Sticker Receipts
                    </option>
                    <option value="Other Revenues">Others</option>
                  </>
                ) : form.watch("type") === "EXPENSE" ? (
                  <>
                    <option value="Salaries and Benefits">
                      Salaries and Benefits
                    </option>
                    <option value="Utilities">Utilities</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Repair and Maintenance">
                      Repair and Maintenance
                    </option>
                    <option value="Furnitures and Fixtures">
                      Furnitures and Fixtures
                    </option>
                    <option value="Representation Expenses">
                      Representation Expenses
                    </option>
                    <option value="Legal & Professional Fees">
                      Legal & Professional Fees
                    </option>
                    <option value="Administrative Costs">
                      Administrative Costs
                    </option>
                    <option value="Other Expenses">Others</option>
                  </>
                ) : (
                  <option value="">
                    Please specify transaction type first...
                  </option>
                )}
              </select>
            </FormControl>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormControl isRequired fontFamily={"font.body"} mt="25px">
              <FormLabel>Amount:</FormLabel>
              <Input {...field} type="number" placeholder="XXXXX" min={1} />
            </FormControl>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormControl fontFamily={"font.body"} mt="25px">
              <FormLabel>Description:</FormLabel>
              <Textarea
                {...field}
                placeholder="Enter description here"
                maxLength={50}
                rows={3}
                resize={"none"}
              />
              <FormHelperText>Maximum of 50 characters only.</FormHelperText>
            </FormControl>
          )}
        />

        {/* Submit Transaction Button */}
        <Box textAlign={"center"} mt="2rem">
          <Button
            disabled={isPending}
            className="text-black bg-yellow-400 end hover:bg-yellow-500 focus:bg-yellow-600"
            type="submit"
          >
            Submit Transaction
          </Button>
        </Box>
      </form>
    </Form>
  );
}
