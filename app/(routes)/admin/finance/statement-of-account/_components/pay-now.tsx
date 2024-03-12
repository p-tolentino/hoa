"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { RiGoogleLine as GCash } from "react-icons/ri";
import { PiBirdBold as Maya } from "react-icons/pi";
import { FaRegCreditCard as Card } from "react-icons/fa";
import { UserTransaction } from "@prisma/client";
import { updateTransaction } from "@/server/actions/user-transactions";
import { Spinner } from "@chakra-ui/react";

const PaymentFormSchema = z.object({
  paymentType: z.string(),
  cardHolderName: z.string(),
  cardNumber: z
    .string({
      required_error: "Valid card number required.",
    })
    .min(16, {
      message: "Invalid card number",
    })
    .max(16, {
      message: "Invalid card number",
    }),
  monthExpiry: z
    .string()
    .min(2, {
      message: "Invalid",
    })
    .max(2, {
      message: "Invalid",
    }),
  yearExpiry: z
    .string()
    .min(2, {
      message: "Invalid",
    })
    .max(2, {
      message: "Invalid",
    }),
  code: z
    .string({
      required_error: "Valid code required.",
    })
    .min(3, {
      message: "Invalid",
    })
    .max(3, {
      message: "Invalid",
    }),
  gcashNumber: z
    .string({
      required_error: "Valid account number required.",
    })
    .min(11, {
      message: "Required",
    })
    .max(11, {
      message: "Required",
    }),
  gcashPin: z
    .string()
    .min(4, {
      message: "Required",
    })
    .max(4, {
      message: "Required",
    }),
  mayaNumber: z
    .number({
      required_error: "Valid account number required.",
    })
    .min(11, {
      message: "Required",
    })
    .max(11, {
      message: "Required",
    }),
  mayaPassword: z.string(),
});

type PaymentFormValues = z.infer<typeof PaymentFormSchema>;

export const PayNow = ({
  amountToPay,
  transactionsToUpdate,
}: {
  amountToPay: string;
  transactionsToUpdate: UserTransaction[];
}) => {
  const router = useRouter();
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formatNumber = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      paymentType: "",
    },
  });

  const onSubmit = async () => {
    startTransition(() => {
      transactionsToUpdate.map((transaction) => {
        updateTransaction(transaction.id)
          .then((data) => {
            if (data.success) {
              update();
              form.reset();
              router.refresh();
              console.log(data.success);
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-5 text-white lg:text-lg font-semibold bg-[#355E3B] hover:bg-[#688f6e]">
          Pay Now
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Pay Association Dues and Fees</DialogTitle>
          <DialogDescription>
            Please enter your credentials to proceed to payment.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="grid py-4 gap-y-4">
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center justify-center">
                            <Card className="w-4 h-4 mr-2" />
                            Pay with Card
                          </div>
                        </SelectItem>
                        <SelectItem value="gcash">
                          <div className="flex items-center justify-center">
                            <GCash className="w-4 h-4 mr-2" />
                            GCash
                          </div>
                        </SelectItem>
                        <SelectItem value="maya">
                          <div className="flex items-center justify-center">
                            <Maya className="w-4 h-4 mr-2" />
                            Maya
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("paymentType") === "card" && (
                <>
                  <FormField
                    control={form.control}
                    name="cardHolderName"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormDescription>
                          Card Number Holder's Name
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="First Last"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormDescription>Card Number</FormDescription>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isPending}
                            placeholder="XXXX - XXXX - XXXX - XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex">
                    <FormField
                      control={form.control}
                      name="monthExpiry"
                      render={({ field }) => (
                        <FormItem className="w-[20%] mb-5">
                          <FormDescription>Expiry Date</FormDescription>
                          <FormControl>
                            <Input
                              placeholder="MM"
                              type="number"
                              min={1}
                              max={12}
                              minLength={2}
                              maxLength={2}
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearExpiry"
                      render={({ field }) => (
                        <FormItem className="w-[20%] mb-5 mr-10">
                          <FormDescription className="opacity-0">
                            Date
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder="YY"
                              type="number"
                              min={24}
                              max={99}
                              minLength={2}
                              maxLength={2}
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem className="mb-5">
                          <FormDescription>Security Code (CVV)</FormDescription>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="XXX"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {form.watch("paymentType") === "gcash" && (
                <>
                  <FormField
                    control={form.control}
                    name="gcashNumber"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormDescription>GCash Mobile Number</FormDescription>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="ex. 09XX-XXX-XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gcashPin"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormDescription>GCash MPIN</FormDescription>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            placeholder="****"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {form.watch("paymentType") === "maya" && (
                <>
                  <FormField
                    control={form.control}
                    name="mayaNumber"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormDescription>
                          Account (Mobile) Number
                        </FormDescription>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="ex. 09XX-XXX-XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mayaPassword"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormDescription>Password</FormDescription>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <DialogFooter>
              <Button
                disabled={isPending}
                className="w-full text-black bg-yellow-400 end hover:bg-yellow-500"
                type="submit"
                onClick={() => onSubmit()}
              >
                {isPending ? (
                  <Spinner />
                ) : (
                  `Pay Amount of ₱ ${formatNumber(Number(amountToPay))}`
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
