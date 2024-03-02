import { db } from "@/lib/db";

export const getAllProperties = async () => {
  try {
    const properties = await db.property.findMany();

    return properties;
  } catch {
    return null;
  }
};
