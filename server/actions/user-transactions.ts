"use server";

import * as z from "zod";
import { PropertySchema } from "@/server/schemas";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";
import { PaymentStatus } from "@prisma/client";

export const updateTransaction = async (transactionId: string) => {
  const user = await currentUser();

  // No Current User
  if (!user) {
    return { error: "Unauthorized" };
  }

  // Validation if user is in database (not leftover session)
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.userTransaction.update({
    where: { id: transactionId },
    data: {
      status: PaymentStatus.PAID,
      datePaid: new Date(),
      paidBy: dbUser.id,
    },
  });

  return { success: "Payment updated successfully" };
};

export const overdueTransaction = async (transactionId: string) => {
  const user = await currentUser();

  // No Current User
  if (!user) {
    return { error: "Unauthorized" };
  }

  // Validation if user is in database (not leftover session)
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.userTransaction.update({
    where: { id: transactionId },
    data: {
      status: PaymentStatus.OVERDUE,
    },
  });

  return { success: "Payment updated successfully" };
};
