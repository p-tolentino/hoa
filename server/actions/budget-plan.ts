"use server";

import * as z from "zod";
import { NewBudgetPlanSchema } from "@/server/schemas";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";
import { UserRole } from "@prisma/client";
import { getBudgetPlanByYear } from "../data/budget-plan";

export const createBudgetPlan = async (
  values: z.infer<typeof NewBudgetPlanSchema>
) => {
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

  if (user.role === UserRole.USER) {
    return { error: "Unauthorized: User role" };
  }

  const existingPlan = await getBudgetPlanByYear(values.forYear);
  if (existingPlan) {
    return { error: "Something went wrong." };
  }

  await db.budgetPlan.create({ data: { ...values } });

  return { success: "Created budget plan successfully" };
};
