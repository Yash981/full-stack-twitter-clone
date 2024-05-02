"use server"

import { auth } from "@/auth";
import { unfollowUser } from "@/data/unfollow-user";
import { Redisclient } from "@/lib/redis";
import { revalidateTag } from "next/cache";


export const unfollowUserAction = async (to: string) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    const userId = session?.user?.id
    // console.log(session?.user?.id, to)
    await unfollowUser(session?.user?.id, to)
    await Redisclient.del(`recommendations:${userId}`)
    revalidateTag(to)
    return true

}