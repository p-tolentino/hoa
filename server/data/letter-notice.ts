"use server";

import { db } from "@/lib/db";

export const getAllLettersAndNotices = async () => {
  try {
    const notices = await db.notice.findMany();

    return notices;
  } catch {
    return null;
  }
};

export const getNoticeById = async (id: string) => {
  try {
    const notice = await db.notice.findUnique({
      where: { id },
    });

    return notice;
  } catch {
    return null;
  }
};
