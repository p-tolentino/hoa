"use server";

import * as z from "zod";
import { PersonalInfoSchema, VehicleSchema } from "@/server/schemas";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/server/data/user";
import { Status } from "@prisma/client";

export const updateInfo = async (
  values: z.infer<typeof PersonalInfoSchema>
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

  await db.personalInfo.upsert({
    where: { userId: dbUser.id },
    update: { ...values, birthDay: new Date(values.birthDay) },
    create: {
      ...values,
      userId: dbUser.id,
      birthDay: new Date(values.birthDay),
    },
  });

  return { success: "Updated information successfully" };
};

export const addVehicle = async (values: z.infer<typeof VehicleSchema>) => {
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

  await db.vehicle.create({ data: { ...values, userId: dbUser.id } });

  return { success: "Vehicle added successfully" };
};

export const updateUserStatus = async (id: string) => {
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

  await db.user.update({
    where: { id: id },
    data: {
      status: Status.ACTIVE,
    },
  });

  return { success: "Member approved successfully" };
};
