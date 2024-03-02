"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { CategoryType, PostType } from "@prisma/client";
import { NewPostSchema } from '@/server/schemas'

export const createPost = async(values: z.infer<typeof NewPostSchema>) => {
    const user = await currentUser();

    // No Current User
    if (!user) {
      return { error: "Unauthorized" };
    }

    await db.post.create({
        data: {
            userId: user.id,
            category: values.category as CategoryType,
            type: values.type as PostType,
            title: values.title,
            description: values.description,
        }
    })
    return { success: "Post successfully Created" };
}

export const deletePost = async(value: string) => {
    const user = await currentUser();

    // No Current User
    if (!user) {
      return { error: "Unauthorized" };
    }

    await db.post.delete({
        where: { id: value}
    })
    return { success: "Post successfully Deleted" };
}

export const createLike = async (userId: string, postId: string) => {
    // Assuming currentUser() fetches the currently logged-in user
    const user = await currentUser();
  
    // No Current User
    if (!user) {
      return { error: "Unauthorized" };
    }
  
    // Check if the like already exists
    const existingLike = await db.like.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });
  
    // If a like already exists, return a message (or handle as needed)
    if (existingLike) {
      return { error: "Post already liked by this user" };
    }
  
    // If no like exists, create a new like
    try {
      await db.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      return { success: "Liked post successfully" };
    } catch (error) {
      console.error("Failed to create like:", error);
      return { error: "Failed to create like" };
    }
  };

  export const deleteLike = async (userId: string, postId: string) => {
    // Assuming currentUser() correctly identifies the currently logged-in user
    const user = await currentUser();

    // No Current User
    if (!user) {
        return { error: "Unauthorized" };
    }

    try {
        await db.like.deleteMany({
            where: {
                userId: userId, // User who created the like
                postId: postId, // Post that was liked
            },
        });
        return { success: "Like deleted successfully" };
    } catch (error) {
        console.error("Failed to delete like:", error);
        return { error: "Failed to delete like" };
    }
};

// Assuming this is the structure of your getLikeCount function
export const getLikeCount = async (postId: string): Promise<number> => {
    // Replace with the actual query to count likes for the postId
    const count = await db.like.count({
      where: { postId },
    });
    return count;
  };

export const checkUserLiked = async (userId: string, postId: string) => {
    const like = await db.like.findFirst({
      where: {
        AND: [
          { userId: userId },
          { postId: postId },
        ],
      },
    });
  
    return like !== null; // Returns true if the user has liked the post, false otherwise
  }
