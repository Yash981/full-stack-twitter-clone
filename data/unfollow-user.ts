"use server";

import { db } from "@/lib/database/db";

export const unfollowUser = async (from: string, to: string) => {
  if(from === to) return;
  const unfollow =  await db.follows.delete({
    where: {
      followerId_followingId: { followerId: from, followingId: to },
    },
  });
  // console.log(unfollow,'unfollow')
  return unfollow;
};
