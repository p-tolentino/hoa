"use server";

import { db } from "@/lib/db";

export const getAllViolations = async () => {
  try {
    const violations = await db.violation.findMany();

    return violations;
  } catch {
    return null;
  }
};

export const getViolationById = async (id: string) => {
  try {
    const violation = await db.violation.findUnique({
      where: { id },
    });

    return violation;
  } catch {
    return null;
  }
};
