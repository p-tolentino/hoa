import { db } from "@/lib/db";

export const getAllPropertyDocuments = async () => {
  try {
    const documents = await db.propertyDocument.findMany();

    return documents;
  } catch {
    return null;
  }
};
