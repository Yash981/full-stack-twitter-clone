"use server";

import { db } from "@/lib/database/db";

export const followUser = async (from: string, to: string) => {
  if(from === to) return;
  const follow = await db.follows.create({
    data: {
      follower: { connect: { id: from } },
      following: { connect: { id: to } },
    },
  });
  // console.log(follow,'follow')
  
  return follow;
};
