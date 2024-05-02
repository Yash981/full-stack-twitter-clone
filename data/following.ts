import { db } from "@/lib/database/db"

export const fetchFollowing = async (userId: string) => {

    const following = await db.follows.findMany({
        where: {
            followerId: userId
        },
        include: {
            following: true

        }
    })
    // console.log(following, 'on server')
    
    return following.map((follow) => follow.following)
}
