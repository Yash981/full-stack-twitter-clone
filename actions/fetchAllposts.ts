"use server"

import { getAllUsersTweets } from "@/data/user"
import { Redisclient } from "@/lib/redis"
// import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
// import {  } from "next/cache"
// interface Props {
//     userId: string
// }
export async function fetchAllposts() {
    const cachedPost = await Redisclient.get('posts')
    if (cachedPost) {
        // console.log('from cachedPost')
        return JSON.parse(cachedPost)
    }
    // if()
    // console.log(userId)
    const allPosts = await getAllUsersTweets()

    await Redisclient.set('posts', JSON.stringify(allPosts))
    // console.log(allPosts,'abjbm')
    revalidatePath('/')
    // console.log(allPosts)
    return allPosts
    
}
// fetchPost()


