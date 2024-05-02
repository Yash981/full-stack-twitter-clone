import { db } from "@/lib/database/db"

export const getFollowers = async (userId: string) => {

    const followers = await db.follows.findMany({
        where: {
            followingId: userId
        },
        include: {
            follower: true
        }
    })
    // console.log(followers,'xnkxxxzxz')
    return followers.map((follow) => follow.follower)
}
// getFollowers('clv7thhs80000n9qgw4nua1ba')