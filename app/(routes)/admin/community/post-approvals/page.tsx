import React from 'react'
import { PendingPostClient } from './_components/client'
import { getPosts } from "@/server/data/posts";
import { PendingPostColumn, columns } from './_components/columns'
import { currentUser } from "@/lib/auth";
import { format } from "date-fns";
import { getPersonalInfo } from "@/server/data/user-info";

export default async function PostApprovals () {

  const posts = await getPosts();
  if (!posts) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const pendingPosts = posts.filter((post) => post.status === "PENDING");

  const formattedPostPromise: Promise<PendingPostColumn>[] =
  pendingPosts.map(async (item) => {
    const issuedBy = await getPersonalInfo(item.userId);
    return {
      id: item.id,
      dateSubmitted: item.createdAt
        ? format(
            new Date(item.createdAt).toISOString().split("T")[0],
            "MMMM dd, yyyy"
          )
        : "",
      submittedBy: `${issuedBy?.firstName || ''} ${issuedBy?.lastName || ''}`.trim(),
      title: item.title,
      category: item.category,
      description: item.description
    };
  });

const formattedRecords = await Promise.all(formattedPostPromise);

  return (
    <div>
      <div className='flex-1 space-y-4'>
        <PendingPostClient data={formattedRecords} />
      </div>
    </div>
  )
}
