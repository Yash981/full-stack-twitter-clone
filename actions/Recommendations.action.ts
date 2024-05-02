"use server"

import { getUserRecommendation } from "@/data/UserRecommendation"

export const fetchRecommendations = async (userId: string) => {
    const AllRecommendations = await getUserRecommendation(userId)
    // console.log(AllRecommendations)
    return AllRecommendations
}