import { db } from "@/lib/database/db";
import { Redisclient } from "@/lib/redis";

export const getUserRecommendation = async (userId: string) => {
    const cachedRecommendations = await Redisclient.get(`recommendations:${userId}`)
    if (cachedRecommendations) {
        // console.log('from cache', cachedRecommendations)
        return JSON.parse(cachedRecommendations)
    }

    // Step 1: Retrieve the users followed by the given user
    const followingByUser = await db.follows.findMany({
        where: {
            followerId: userId
        },
        include: {
            following: true
        }
    });

    // Step 2 & 3: Retrieve users followed by the followed users and filter out already followed users
    const recommendations: string[] = [];
    for (const follow of followingByUser) {
        const usersFollowedByFollowedUser = await db.follows.findMany({
            where: {
                followerId: follow.following.id
            },
            select: {
                followingId: true
            }
        });
        for (const userFollowedByFollowedUser of usersFollowedByFollowedUser) {
            if (userFollowedByFollowedUser.followingId !== userId && !followingByUser.some(follow => follow.following.id === userFollowedByFollowedUser.followingId)) {
                recommendations.push(userFollowedByFollowedUser.followingId);
            }
        }
    }
    // console.log('not found in cache')
    await Redisclient.set(`recommendations:${userId}`, JSON.stringify(recommendations))
    return recommendations;
}
