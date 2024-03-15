"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";

export const createDispute = async (values: any) => {
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

  const result = await db.dispute.create({
    data: {
      ...values,
      submittedBy: dbUser.id,
    },
  });

  return { success: "Submitted report successfully", dispute: { ...result } };
};

export const updateOfficerAssigned = async (
  id: string,
  officerAssigned: string
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

  await db.dispute.update({
    where: { id },
    data: {
      officerAssigned,
      status: "Under Review",
      step: 2,
      progress: "Step 2: Review by Grievance and Adjudication Committee",
    },
  });

  return {
    success: "Officer assigned successfully, dispute now under review",
  };
};

export const updateLetterSent = async (id: string, letterSent: boolean) => {
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

  await db.dispute.update({
    where: { id },
    data: {
      letterSent,
    },
  });

  return {
    success: "Letter/notice sent successfully to persons involved.",
  };
};

export const updateStatus = async (id: string, status: string) => {
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

  await db.dispute.update({
    where: { id },
    data: {
      status,
    },
  });

  return {
    success: "Status updated successfully.",
  };
};

export const updateLastStep = async (id: string) => {
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

  await db.dispute.update({
    where: { id },
    data: {
      step: 3,
      progress: "Step 3: Dispute Resolution with Corrective Actions",
    },
  });

  return {
    success: "Report marked resolved (closed).",
  };
};

export const updateResolved = async (id: string) => {
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

  await db.dispute.update({
    where: { id },
    data: {
      status: "Resolved",
    },
  });

  return {
    success: "Report marked resolved (closed).",
  };
};
