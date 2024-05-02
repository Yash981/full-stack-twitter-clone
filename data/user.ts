import { db } from "@/lib/database/db"
export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            follower: true,
            posts: true

        }

    })
    if(user) return user
    return null
}

export const getAllUsersTweets = async () => {
    const tweets = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: true,
            likes: true

        }
        
    })
    return tweets
}

export const getAllTweetsByUserId = async (userId: string) => {
    const tweets = await db.post.findMany({
        where: {
            authorId: userId
        },
        include: {
            author: true,
            likes: true
        },
        orderBy: {
            createdAt: 'desc'
        }

    })
    return tweets
}

