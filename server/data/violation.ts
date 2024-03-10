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
