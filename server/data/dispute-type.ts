"use server";

import { db } from "@/lib/db";

export const getAllDisputeTypes = async () => {
  try {
    const types = await db.disputeType.findMany();

    return types;
  } catch {
    return null;
  }
};

export const getDisputeTypeByTitle = async (title: string) => {
  try {
    const dispute = await db.disputeType.findFirst({
      where: {
        title,
      },
    });

    return dispute;
  } catch {
    return null;
  }
};
