"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";

export const generateHoa = async () => {
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

  await db.hoa.create({
    data: {
      name: "Sample HOA",
      startingFunds: 10000,
      funds: 10000,
      fixedDue: 500,
      lotSizeDue: 600,
    },
  });

  return { success: "Generated sample HOA successfully" };
};
