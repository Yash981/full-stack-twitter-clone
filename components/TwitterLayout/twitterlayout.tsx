"use client"
import { createpost } from "@/actions/createpost";
import { fetchAllposts } from "@/actions/fetchAllposts";
import { CreateTweetData, Post, User } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import FeedCard from "../feedcard";
import { Like } from "@prisma/client";
import { UserlikeAction } from "@/actions/userlike.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/lib/database/supabaseClient";


export default function TwitterLayout() {
    const [tweets, setTweets] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [createTweet, setCreateTweet] = useState<string | "">('');
    const { data: session } = useSession();
    const [selectedFile, setSelectedFile] = useState<null | File>(null);
    const [imageurl, setimageurl] = useState<string>('');
    const router = useRouter()


    useEffect(() => {
        const fetchTweets = async () => {
            try {
                setLoading(true);
                const posts = await fetchAllposts();

                const tweetsss = posts.map((post: Post) => {
                    return { ...post, key: post.id };
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

    const handleChangeInputFile = useCallback((input: HTMLInputElement) => {
        return async (event: Event) => {
            event.preventDefault();
            const file: File | null | undefined = input.files?.[0];
            if (!file) return;
            setSelectedFile(file);
            const randomfileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            try {
                const { data, error } = await supabase.storage
                    .from('twitter-image')
                    .upload(`public/${randomfileName}`, file)
                
                if (error) {
                    toast.error("Upload Failed");
                    console.error("Error uploading image:", error);
                }
                const { data: url } = await supabase.storage.from('twitter-image').getPublicUrl(`public/${randomfileName}`)
                setimageurl(url.publicUrl)
                toast.success("Upload Successful");
            } catch (error) {
                toast.error("Upload Failed");
                console.error("Error uploading image:", error);
            }
        };
    }, []);

    const handleSelectFile = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.addEventListener('change', handleChangeInputFile(input))
        input.click();
    }, [handleChangeInputFile])

    const handleCreateTweet = async () => {

        if (!session?.user?.id) {
            return;
        }
        if (createTweet.trim() === '') {
            return;
        }

        try {
            const newPost: CreateTweetData = await createpost({
                content: createTweet,
                image: imageurl || ''
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
                likeCount: 0,
                BookMarks: [],
                BookMarkCount: 0
            };
            setTweets(prevTweets => [newPostObject, ...prevTweets]);
            // console.log(tweets,'tweets')
            setCreateTweet('');
            setSelectedFile(null)
            setimageurl('')
            
            toast.success('Tweet created successfully')
        } catch (error) {
            console.error('Error creating tweet:', error);
            toast.error('Error creating tweet')
        } finally {
            router.refresh()
        }
    };

    return (
        <>
            {session?.user &&
                <div className="className='border-b  border-gray-600   transition-all cursor-pointer mt-4 min-h-52">
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
                            <textarea name="tweet" id="tweet" cols={30} rows={4} placeholder="What's happening" className="w-full border-none outline-none p-0 bg-transparent resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-3 pl-2" onChange={(e) => setCreateTweet(e.target.value)} value={createTweet} required />
                            {imageurl && <Image src={imageurl} width={300} height={300} alt={'profile'} className=" mr-4 mb-2" />}
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
            {tweets && tweets.map((tweet, idx) => {
                return (
                    <>
                        <FeedCard key={tweet.id} image={tweet.author?.image} content={tweet.content} name={tweet.author?.name} id={tweet.author?.id!} likes={tweet.likeCount} tweetId={tweet.id} hasLiked={tweet.likes && tweet.likes.some((like) => like.userId === session?.user?.id)} BookMarkcount={tweet.BookMarkCount} hasBookmarked={tweet.BookMarks && tweet.BookMarks.some((bookmark) => bookmark.userId === session?.user?.id)} imageUrl={tweet?.ImageURL??''}/>
                    </>
                )
            })}
        </>
    )
}