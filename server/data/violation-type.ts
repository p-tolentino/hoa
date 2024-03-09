"use server";

import { db } from "@/lib/db";

export const getAllViolationTypes = async () => {
  try {
    const types = await db.violationType.findMany();

    return types;
  } catch {
    return null;
  }
};

export const getViolationTypeByName = async (name: string) => {
  try {
    const violations = await db.violationType.findFirst({
      where: {
        name,
      },
    });

    return violations;
  } catch {
    return null;
  }
};
