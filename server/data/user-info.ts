"use server";

import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getInfoById = async (id: string) => {
  try {
    const info = await db.personalInfo.findUnique({
      where: { userId: id },
    });

    return info;
  } catch {
    return null;
  }
};

export const getPersonalInfo = async (id: string) => {
  try {
    const info = await db.personalInfo.findFirst({
      where: { userId: id },
    });

    return info;
  } catch {
    return null;
  }
};

export const getPropertyById = async (id: string) => {
  const user = await getUserById(id);

  try {
    const property = await db.property.findFirst({
      where: { id: user?.info?.address || "" },
    });

    return property;
  } catch {
    return null;
  }
};

export const getVehicleById = async (id: string) => {
  try {
    const vehicles = await db.vehicle.findMany({
      where: { userId: id },
    });

    return vehicles;
  } catch {
    return null;
  }
};
