"use server"

import { getAllTweetsByUserId } from "@/data/user"
import { revalidateTag } from "next/cache"

export const fetchUserPost = async (userId: string) => {

    const posts = await getAllTweetsByUserId(userId)
    // console.log(posts,'on server')
    // revalidateTag(userId)
    return posts
}