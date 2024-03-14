"use server";

import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getMemberCount = async () => {
{
      // Use count to get the total number of personalInfo records
      const count = await db.personalInfo.count();
  
      // Return both info and count
      return  count ;
    } 
  };

  export const getHoaFunds = async () => {
    try {
      const hoa = await db.hoa.findFirst();
  
      return hoa?.funds;
    } catch {
      return 0;
    }
  };

  export const getViolations = async () => {
    try {
      // Count violations where status is not "Invalid"
      const violationsCount = await db.violation.count({
        where: {
          status: {
            not: "Invalid",
          },
        },
      });
  
      return violationsCount;
    } catch {
      return 0;
    }
  };

  export const getHoaTransactions = async () => {
    try {
      const transactions = await db.hoaTransaction.findMany();
  
      return transactions;
    } catch {
      return null;
    }
  };
  
  export const getAllViolations = async () => {
    try {
      const violations = await db.violation.findMany();
        return violations
    } catch {
      return null;
    }
  };

  export const getDiscussionCount = async () => {
    const postType = "DISCUSSION"

        const postsCount = await db.post.count({
          where: { type: postType },
        });
    
        return postsCount
  };

  export const getBusinessCount = async () => {
    const postType = "BUSINESS";
  
      const postsCount = await db.post.count({
        where: { type: postType },
      });
  
      return postsCount
  };

  export const getPosts = async () => {
    try {
      const posts = await db.post.findMany();
  
      return posts;
    } catch {
      return null;
    }
  }

  export const getEventCount = async () => {
      const events = await db.events.count();
  
      return events;
  }
  export const countUniqueUsersWhoAnsweredPolls = async (): Promise<number> => {
    try {
      // Attempt to retrieve unique userIds first
      const uniqueUserIds = await db.response.findMany({
        select: {
          userId: true,
        },
        distinct: ['userId'],
      });
  
      // Count the number of unique userIds
      const uniqueUserCount = uniqueUserIds.length;
  
      return uniqueUserCount;
    } catch (error) {
      console.error("Error counting unique users who answered polls:", error);
      return 0;
    }
  };