"use server";

import { BookMarkPost, UnBookmark } from "@/data/BookMarkPost";
import { checkIfUserBookMarked } from "@/data/checkifUserBookMarked";
import { useCurrentUser } from "@/hooks/customHooks";
import { Redisclient } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export const AddToBookmark = async (tweetId: string) => {
  const userId = await useCurrentUser();
  if (!userId) {
    return;
  }
  const checkBookmark = await checkIfUserBookMarked(userId, tweetId);
  if (checkBookmark) {
    const unbookmark = await UnBookmark(userId, tweetId);
    await Redisclient.del(`posts`);
    revalidatePath("/");
    return { success: false };
  } else {
    const bookmarking = await BookMarkPost(userId, tweetId);
    await Redisclient.del(`posts`);
    // console.log(bookmarking)
    revalidatePath("/");
    return { success: true };
  }
};
