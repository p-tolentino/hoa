"use server";

import { db } from "@/lib/db";
import { PaymentStatus } from "@prisma/client";

export const getTransactionByStatus = async (status: PaymentStatus) => {
  try {
    const transactions = await db.userTransaction.findMany({
      where: { status },
    });

    return transactions;
  } catch {
    return null;
  }
};

export const getTransactionByAddress = async (id: string) => {
  try {
    const transactions = await db.userTransaction.findMany({
      where: { addressId: id },
    });

    return transactions;
  } catch {
    return null;
  }
};

export const getAllTransactions = async () => {
  try {
    const transactions = await db.userTransaction.findMany();

    return transactions;
  } catch (err) {
    throw err;
  }
};
