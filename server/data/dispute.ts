"use server";

import { db } from "@/lib/db";

export const getAllDisputes = async () => {
  try {
    const disputes = await db.dispute.findMany();

    return disputes;
  } catch {
    return null;
  }
};

export const getDisputeById = async (id: string) => {
  try {
    const dispute = await db.dispute.findUnique({
      where: { id },
    });

    return dispute;
  } catch {
    return null;
  }
};
