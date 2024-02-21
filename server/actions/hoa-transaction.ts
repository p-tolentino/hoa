"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { NewTransactionSchema } from "@/server/schemas";
import { currentUser } from "@/lib/auth";
import { HoaTransactionType } from "@prisma/client";

export const createTransaction = async (values: z.infer<typeof NewTransactionSchema>, transId?: string) => {
    const user = await currentUser();

    // No Current User
    if (!user) {
      return { error: "Unauthorized" };
    }

    // await db.hoaTransaction.upsert({
    // where: { id: transId },
    //   update: { 
    //     ...values,
    //     dateIssued: new Date(values.dateIssued),
    //     type: values.type as HoaTransactionType,
    //     amount: parseInt(values.amount, 10)
    //   },
    //   data:{ 
    //     type: values.type as HoaTransactionType,
    //     purpose: values.purpose,
    //     description: values.description,
    //     amount: parseInt(values.amount, 10),
    //     dateIssued: new Date(values.dateIssued),
    //     userId: user.id
    //   }
    // });
    await db.hoaTransaction.create({
      data: { 
            type: values.type as HoaTransactionType,
            purpose: values.purpose,
            description: values.description,
            amount: parseInt(values.amount, 10),
            dateIssued: new Date(values.dateIssued),
            userId: user.id
          }
    })

    return { success: "Transaction successfully Added! / Updated" };
}


export const updateFunds = async (fund: number) => {

  await db.hoa.updateMany({
    data: {
      funds: fund,
    },
  });

  return { success: "Funds updated successfully" };
  }