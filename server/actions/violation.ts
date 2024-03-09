"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";

export const createViolation = async (values: any) => {
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

  await db.violation.create({
    data: {
      ...values,
      submittedBy: dbUser.id,
    },
  });

  return { success: "Submitted report successfully" };
};
