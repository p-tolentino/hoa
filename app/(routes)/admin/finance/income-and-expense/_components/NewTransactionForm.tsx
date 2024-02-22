'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createTransaction, updateFunds } from "@/server/actions/hoa-transaction";

import {
  Box,
  //Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  //Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea
} from '@chakra-ui/react'

import {
  Form,
  // FormControl,
  FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

export default function NewTransactionForm ({ onSuccess, currentFunds, initialData }:NewTransactionFormProps ) {
  console.log(currentFunds)
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
    if(initialData)
    {
      createTransaction(values, initialData.id)
    }else{
    console.log(values);
    startTransition(() => {
      createTransaction(values)
      .then((data) => {
        if(data.error) {
          console.log(data.error);
        }

        if (data.success){
          if(values.type==='INCOME'){
            var newFund = currentFunds + parseInt(values.amount, 10)
            updateFunds(newFund)
            console.log(newFund);
          }else{
            var newFund = currentFunds - parseInt(values.amount, 10)
            updateFunds(newFund)
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
    })
  }}
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>

    <FormField
  control={form.control}
  name="dateIssued"
  render={({ field }) => (
    <FormItem className="mb-5">
      <FormControl isRequired fontFamily={'font.body'} isInvalid={form.formState.errors.dateIssued ? true : false}>
        <FormLabel>Date issued:</FormLabel>
        <Input 
          type='date'
          {...field}
        />
        {form.formState.errors.dateIssued && (
          <FormErrorMessage>{form.formState.errors.dateIssued.message}</FormErrorMessage>
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
        <FormControl isRequired fontFamily={'font.body'} mt='25px'>
          <FormLabel>Transaction Type:</FormLabel>
          <RadioGroup {...field} colorScheme='yellow'>
            <Stack direction={'row'} spacing={5}>
              <Radio value='INCOME'>Income</Radio>
              <Radio value='EXPENSE'>Expense</Radio>
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
    <FormControl isRequired fontFamily={'font.body'} mt='25px'>
      <FormLabel>Purpose:</FormLabel>
      <Textarea
        {...field}
        placeholder='Enter Purpose Here'
        maxLength={50}
        rows={1}
        resize={'none'}
      />
    </FormControl>
  )}
/>
{/* Amount */}
<FormField
  control={form.control}
  name="amount"
  render={({ field }) => (
    <FormControl isRequired fontFamily={'font.body'} mt='25px'>
      <FormLabel>Amount:</FormLabel>
      <Input 
        {...field}
        type='number' 
        placeholder='XXXXX'
        min={1}
      />
    </FormControl>
  )}
/>

{/* Description */}
<FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormControl fontFamily={'font.body'} mt='25px'>
      <FormLabel>Description:</FormLabel>
      <Textarea
        {...field}
        placeholder='Enter description here'
        maxLength={50}
        rows={3}
        resize={'none'}
      />
      <FormHelperText>Maximum of 50 characters only.</FormHelperText>
    </FormControl>
  )}
/>

      {/* Submit Transaction Button */}
      <Box textAlign={'center'} mt='2rem'>
        <Button //colorScheme='yellow' fontFamily={'font.heading'} 
        type="submit">
          Submit Transaction
        </Button>
      </Box>
    </form>
    </Form>
  )
}
