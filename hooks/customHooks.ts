import { AddToBookmark } from "@/actions/addToBookmark.action";
import { fetchAllposts } from "@/actions/fetchAllposts";
import { fetchUserPost } from "@/actions/fetchUserPosts"
import { UserlikeAction } from "@/actions/userlike.action";
// import { followUserAction } from "@/actions/followUser.action";
// import { unfollowUserAction } from "@/actions/unfollowUser.action";
import { auth } from "@/auth";
import { UserUnLike } from "@/data/UserUnLike";
import { getFollowers } from "@/data/followers";
import { fetchFollowing } from "@/data/following";
// import { auth } from "@/auth";

export const useGetAllTweetsByUser = async (userId: string) => {
    // const session  = await auth();
    const posts = await fetchUserPost(userId)
    return posts
}

export const useGetAllTweets = async () => {
    const allPosts = await fetchAllposts()
    return allPosts
}

export const useGetFollowersOfUser = async (userId: string) => {

    const followers = await getFollowers(userId)
    // console.log(followers)
    return followers
}
export const useGetFollowingsOfUser = async (userId: string) => {

    const following = await fetchFollowing(userId)
    // console.log(following)
    return following
}

export const useCurrentUser = async () => {
    const session  = await auth();
    return session?.user?.id
}

export const useBookMarkPost = async (tweetId: string) => {
    const bookmarking = await AddToBookmark(tweetId)
}