import { db } from "@/lib/db";

export const getAllBudgetPlans = async () => {
  try {
    const plans = await db.budgetPlan.findMany();

    return plans;
  } catch {
    return null;
  }
};

export const getBudgetPlanByYear = async (forYear: number) => {
  try {
    const plan = await db.budgetPlan.findFirst({
      where: { forYear },
    });

    return plan;
  } catch (error) {
    throw error;
  }
};

export const getBudgetPlan = async (id: string) => {
  try {
    const plan = await db.budgetPlan.findFirst({
      where: {id}
    });

    return plan;
  } catch {
    return null;
  }
};
