import { currentUser } from "@/lib/auth";
import BudgetPlanning from "./_components/budget-plans-table";
import { getAllBudgetPlans } from "@/server/data/budget-plan";

export const BudgetPlanPage = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const plans = await getAllBudgetPlans();

  if (!plans) {
    return null;
  }

  await Promise.all(plans);

  return (
    <>
      <BudgetPlanning budgetPlans={plans} />
    </>
  );
};

export default BudgetPlanPage;
