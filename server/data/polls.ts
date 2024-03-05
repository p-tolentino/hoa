import { db } from "@/lib/db";

export const getPolls = async () => {
  try {
    const polls = await db.polls.findMany();

    return polls;
  } catch {
    return null;
  }
}
