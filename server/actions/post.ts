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

export const createLike = async(userId: string, postId: string) => {
    const user = await currentUser();

    // No Current User
    if (!user) {
      return { error: "Unauthorized" };
    }

    await db.like.create({
        data: {
            userId: userId,
            postId: postId,
        }
    })
    return { success: "Liked post successfully "};
}

export const  getLikeCount = async (postId: string) => {
    const count = await db.like.count({
      where: {
        id: postId,
      },
    });
  
    return count;
  }

export const checkUserLiked = async (userId: string, postId: string) => {
    const like = await db.like.findFirst({
      where: {
        AND: [
          { userId: userId },
          { id: postId },
        ],
      },
    });
  
    return like !== null; // Returns true if the user has liked the post, false otherwise
  }
