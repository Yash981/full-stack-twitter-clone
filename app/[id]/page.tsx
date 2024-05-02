import UserRecommendation from '@/components/FetchUserRecommendation'
// import ClientSideUserId from '@/components/client-side-userId'
import FeedCard from '@/components/feedcard'
import FollowUnfollowBtn from '@/components/followUnfollowBtn'
import SideBar from '@/components/sidebar'
import { useCurrentUser, useGetAllTweetsByUser, useGetFollowersOfUser, useGetFollowingsOfUser } from '@/hooks/customHooks'

import { Link } from 'next-view-transitions'
import { headers } from 'next/headers'
import Image from 'next/image'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

export type Followers = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;

}
const UserProfile = async () => {
    
    const headerList = headers()
    const pathname = headerList.get("x-pathname")
   
    const posts = await useGetAllTweetsByUser(pathname?.slice(1) as string)
    const followers: Followers[] = await useGetFollowersOfUser(pathname?.slice(1) as string)
    const followings = await useGetFollowingsOfUser(pathname?.slice(1) as string)
    const CurrentuserId = await useCurrentUser()
    
    return (
        <>
            <div className="grid grid-cols-12 h-screen w-screen px-4">
                <SideBar />
                <div className="lg:col-span-6 border-l-2 border-r-2 border-gray-600 h-screen overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:col-span-9  max-sm:col-span-10 sm:col-span-10">
                    <nav className="p-4 pt-2 flex h-16 bg-slate-600 justify-start items-center">
                        <Link
                            href="/"
                            className="text-3xl ml-4 transition-all hover:text-[#1d9bf0]"
                        >
                            <IoArrowBackOutline />
                        </Link>
                        <div className="w-full flex justify-start items-start flex-col m-2">
                            <h1 className="text-2xl font-bold ml-4">{posts[0] && posts[0].author?.name}</h1>
                            <div className="pl-4">
                                {posts && posts.length > 0 && (<p>{posts?.length} tweets </p>)}
                            </div>
                            {/* <UserDetails id={userId.slice(1)} /> */}
                        </div>
                    </nav>
                    <div className="mx-auto mt-4 flex items-center flex-col">
                        {posts[0] && posts[0].author?.image && (
                            <Image
                                src={posts[0].author?.image}
                                width={100}
                                height={100}
                                alt="profile"
                                className="rounded-full object-cover object-center max-sm:h-10 max-sm:w-10"
                            />
                        )}
                        <p className='text-xl'>{posts[0] && posts[0].author?.name}</p>
                        <div className="flex justify-center flex-col">
                            <div className="flex gap-4 mt-2 text-sm text-gray-400">
                                <span>{followers.length} followers</span>
                                <span>{followings.length} following</span>
                            </div>
                            {/* {CurrentuserId && CurrentuserId !== pathname?.slice(1) &&

                                <button className="bg-slate-800 text-white font-semibold rounded-full px-5 py-2 mt-2" >{
                                    followers.find((follower) => follower.id === CurrentuserId) ? 'Following' : 'Follow'
                                }</button>
                            } */}

                            <FollowUnfollowBtn followers={followers as Followers[]} pathname={pathname as string} currentUser={CurrentuserId as string} />
                        </div>
                    </div>
                    <div>
                        {posts && posts.map((post, idx2) => (
                            <FeedCard key={idx2} name={post.author?.name || undefined} content={post.content} image={post.author.image || undefined} id={post.author?.id!} likes={post.likeCount} tweetId={post.id} hasLiked={post.likes.some((like) => like.userId === CurrentuserId)}/>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3 hidden lg:block">
                    <UserRecommendation />
                </div>
            </div>
        </>
    );
};

export default UserProfile