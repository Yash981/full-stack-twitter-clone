"use client"
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiMessageRounded, BiRepost } from 'react-icons/bi'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoBookmarkOutline, IoHeart } from 'react-icons/io5'
import { RiShare2Line } from 'react-icons/ri'
import { UserlikeAction } from '@/actions/userlike.action'
import { useRouter } from 'next/navigation'

export type Props = {
    name?: string
    content: string
    image?: string
    id: string
    likes: number
    tweetId: string
    hasLiked: boolean
}

const FeedCard = ({ name, content, image, id, likes, tweetId,hasLiked }: Props) => {
    const router = useRouter()
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    // if(hasLiked) setLiked(true)
    // console.log(hasLiked)
    // useEffect(() => {
    //     // Function to check if the user has liked the post
    //     const checkUserLikedPost = async () => {
    //         try {
    //             // Call UserlikeAction to check if the current user has liked the post
    //             const result = await UserlikeAction(tweetId,'useEffect');
    //             // console.log(result.userId,id)
    //             if (result && result.userId === id && !result.hasOwnProperty('likeCount') && result.postId === tweetId) {
    //                 // If the current user has liked the post, set liked to true
    //                 setLiked(true);
    //                 setLikeCount(likes);
    //             }
    //         } catch (error) {
    //             console.error('Error checking if the post is liked:', error);
    //         }
    //     };

    //     // Call the function to check if the user has liked the post when the component mounts
    //     checkUserLikedPost();
    // }, [id, likes, tweetId]);

    const handleLike = async () => {
        // Perform like action
        try {
            // Call UserLikeAction with tweetId
            const result = await UserlikeAction(tweetId,'onClick');
 
            //@ts-ignore
            if (result && !result.hasOwnProperty('likeCount') && result.postId === tweetId) {
                // If the post was successfully liked
                setLiked(true);
                setLikeCount(likeCount + 1);
            } else {
                // If the post was successfully unliked
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        } catch (error) {
            console.error('Error liking tweet:', error);
        } finally{
            router.refresh()
        }
    };

    return (
        <div className='border-b  border-gray-600 p-4 hover:bg-slate-800 transition-all cursor-pointer'>
            <div className="grid grid-cols-12">
                <div className="col-span-1 md:mr-5 max-sm:mr-2">
                    <Image
                        src={image || ""}
                        width={50}
                        height={50}
                        alt={'profile'}
                        className='rounded-full object-cover object-center '
                    />

                </div>
                <div className="col-span-11 ">
                    <Link href={`/${id}`}>
                        <h5 className='transition-all hover:text-[#1d9bf0]'>{name}</h5>
                    </Link>
                    <p className='break-words'>{content}</p>

                    <div className=' flex w-full justify-between mt-2 items-center text-xl px-4'>
                        <div>
                            <BiMessageRounded />
                        </div>
                        <div>
                            <BiRepost />
                        </div>
                        <div className='flex truncate justify-center items-center'>
                            <button className="like-button flex gap-2 items-center" onClick={handleLike}>
                                {hasLiked || liked ? <IoHeart className="liked text-red-500 " /> : <IoMdHeartEmpty />}
                                <span>{likeCount < 0 ? 0 : likeCount}</span>
                            </button>
                            
                        </div>
                        <div>
                            <IoBookmarkOutline />
                        </div>
                        <div className="">
                            <RiShare2Line />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard

