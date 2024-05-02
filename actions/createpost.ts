"use server"

import { auth } from "@/auth";
import { db } from "@/lib/database/db";
import { Redisclient } from "@/lib/redis";
import { revalidatePath } from "next/cache";
interface Props{
    content: string
    image?: string
}

export const createpost = async (data: Props) => {

    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({ where: { id: session.user?.id } })
    if(!user) {
        throw new Error("User not found")
    }
    const RateLimit = await Redisclient.get(`RATE_LIMIT:${user.id}`)
    if(RateLimit) {
        throw new Error("Rate limit exceeded Please wait...")
    }
    const tweet = await db.post.create({
        data: {
            content: data.content,
            ImageURL: data.image,
            author: {
                connect: {
                    id: user.id
                }
            }
        },
    })
    await Redisclient.setex(`RATE_LIMIT:${user.id}`, 10, 1)
    await Redisclient.del(`posts`)
    return tweet;
}