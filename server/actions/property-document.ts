"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";

export const updateDocument = async (values: any, id?: string) => {
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

  await db.propertyDocument.upsert({
    where: { id },
    update: {
      ...values,
    },
    create: {
      ...values,
    },
  });

  return { success: "Updated property document successfully" };
};
