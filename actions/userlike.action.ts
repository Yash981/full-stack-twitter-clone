"use server";

import { UserLike } from "@/data/UserLike";
import { UserUnLike } from "@/data/UserUnLike";
import { checkIfUserLikedPost } from "@/data/checkIfUserLikedPost";
import { useCurrentUser } from "@/hooks/customHooks";
import { Redisclient } from "@/lib/redis";

export const UserlikeAction = async (toPostId: string, click: string) => {
  const currentUserId = await useCurrentUser();
  const cacheKey = `likes:${toPostId}:${currentUserId}`;
  if (click === "useEffect") {
    const cachedLikes = await Redisclient.get(
        cacheKey
    );
    if (cachedLikes) {
    //   console.log("from cache111");
      return JSON.parse(cachedLikes);
    }
  }

  const userLikedPost = await checkIfUserLikedPost(currentUserId!, toPostId);
  //   let result;
  if (!userLikedPost) {
    const likethePost = await UserLike(toPostId, currentUserId!);
    await Redisclient.del(`posts`);
    await Redisclient.del(cacheKey);
    await Redisclient.set(
        cacheKey,
      JSON.stringify(likethePost)
    );
    return likethePost;
  } else {
    const unLikethePost = await UserUnLike(toPostId, currentUserId!);
    await Redisclient.del(`posts`);
    await Redisclient.del(cacheKey);
    await Redisclient.set(
        cacheKey,
      JSON.stringify(unLikethePost)
    );
    return unLikethePost;
  }

  // console.log(likethePost)
};
