"use client"
import { followUserAction } from "@/actions/followUser.action"
import { unfollowUserAction } from "@/actions/unfollowUser.action"
import { Followers } from "@/app/[id]/page"
import { useRouter } from "next/navigation"

interface Props {
    followers: Followers[]
    pathname: string
    currentUser: string
}
export default function FollowUnfollowBtn({ followers,pathname,currentUser }: Props) {
    const router = useRouter()
    // console.log(followers, 'followers', pathname,currentUser)
    const handleFollowUser = async (action:"Follow" | "Following") => {
        if (action === "Follow") {
            const follow = await followUserAction(pathname?.slice(1))
            router.refresh()
            return follow === true
        } else {
            const unfollow = await unfollowUserAction(pathname?.slice(1))
            router.refresh()
            return unfollow === true
        }
    }
    const isFollowing = followers.find(follower => follower.id === currentUser);
    return (
        <>
        {currentUser && currentUser !== pathname?.slice(1) &&

            <button className="bg-slate-800 text-white font-semibold rounded-full px-5 py-2 mt-2" onClick={() => handleFollowUser(isFollowing && isFollowing ? "Following" : "Follow")}>{
                isFollowing ? 'Following' : 'Follow'
            }</button>
        }
        </>
    )
}