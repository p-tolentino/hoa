"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";
import { ViolationTypeFormValues } from "@/app/(routes)/admin/violations/violation-list/_components/AddViolationButton";

export const createViolationType = async (values: ViolationTypeFormValues) => {
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

  await db.violationType.create({
    data: {
      ...values,
      fee: parseFloat(values.fee),
      deadline: parseInt(values.deadline),
    },
  });

  return { success: "Created violation type successfully" };
};
