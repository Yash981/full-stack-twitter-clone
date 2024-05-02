"use client"
import { createpost } from "@/actions/createpost";
import { fetchAllposts } from "@/actions/fetchAllposts";
import { CreateTweetData, Post, User } from "@/schema";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import FeedCard from "../feedcard";
import { Like } from "@prisma/client";
import { UserlikeAction } from "@/actions/userlike.action";
import { useRouter } from "next/navigation";


export default function TwitterLayout() {
    const [tweets, setTweets] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [createTweet, setCreateTweet] = useState<string | "">('');
    const { data: session } = useSession();
    const router = useRouter()
    // const [liked, setLiked] = useState< {} | null>({});

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                setLoading(true);
                const posts = await fetchAllposts();
                const tweetsss = posts.map((post: Post) => {
                    return post
                }) as Post[];
                setTweets(tweetsss);
            } catch (error) {
                setError(error ? error.toString() : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchTweets();
    }, [session]);


    const handleSelectFile = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click();
    }, [])

    const handleCreateTweet = async () => {
        
        if (!session?.user?.id) {
            return;
        }
        if(createTweet.trim() === '') {
            return;
        }
        try {
            const newPost: CreateTweetData = await createpost({
                content: createTweet,
                image: "",
            })
            if (!newPost) {
                return;
            }
            
            const newPostObject: Post = {
                id: '',
                content: newPost.content,
                ImageURL: newPost.image || '',
                authorId: session.user.id,
                author: session.user?.id ? { ...session.user, post: [] } as User : undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
                likes: [],
                likeCount:0, 
            };
            setTweets(prevTweets => [newPostObject, ...prevTweets]);
            setCreateTweet('');
        } catch (error) {
            console.error('Error creating tweet:', error);
        }
    };
    // console.log(tweets && tweets[4])
    return (
        <>
            {session?.user &&
                <div className="className='border-b  border-gray-600   transition-all cursor-pointer mt-4 h-52">
                    <div className="grid grid-cols-12">
                        <div className="col-span-1 text-center p-2">
                            {session.user.image ? (<Image
                                src={session.user?.image}
                                width={50}
                                height={50}
                                alt={'profile'}
                                className="rounded-full mr-4"
                            />) : (
                                <RxAvatar width={100} height={50} />)}
                        </div>
                        <div className="col-span-11">
                            <textarea name="tweet" id="tweet" cols={30} rows={4} placeholder="What's happening" className="w-full h-full border-none outline-none p-0 bg-transparent resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-3 pl-2" onChange={(e) => setCreateTweet(e.target.value)} value={createTweet} required/>
                            <hr className="border-gray-600 " />
                            <div className="flex justify-between px-4 pt-2 items-center">
                                <IoImagesOutline onClick={handleSelectFile} className="cursor-pointer" />
                                <div className="">
                                    <button className='bg-[#1d9bf0] w-full text-white font-semibold rounded-full px-5 py-2' onClick={handleCreateTweet}>Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            {tweets && tweets.map((tweet,idx) => {
                return (
                    <>
                        <FeedCard key={idx} image={tweet.author?.image} content={tweet.content} name={tweet.author?.name} id={tweet.author?.id!} likes={tweet.likeCount} tweetId={tweet.id} hasLiked={tweet.likes && tweet.likes.some((like)=>like.userId === session?.user?.id)} />
                    </>
                )
            })}
        </>
    )
}