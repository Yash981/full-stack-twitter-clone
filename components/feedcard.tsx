"use client"
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiMessageRounded, BiRepost } from 'react-icons/bi'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoBookmarkOutline, IoBookmarkSharp, IoHeart } from 'react-icons/io5'
import { RiShare2Line } from 'react-icons/ri'
import { UserlikeAction } from '@/actions/userlike.action'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
// import { BookMarkPost } from './BookMarkThePost'
import { AddToBookmark } from '@/actions/addToBookmark.action'
import BookMarkPost from './BookMarkThePost'

export type Props = {
    name?: string
    content: string
    image?: string
    id: string
    likes: number
    tweetId: string
    hasLiked: boolean
    BookMarkcount: number
    hasBookmarked: boolean
    imageUrl: string | null 
}

const FeedCard = ({ name, content, image, id, likes, tweetId, hasLiked,BookMarkcount,hasBookmarked, imageUrl }: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [Bookmarkcounter, setBookmarkcounter] = useState(BookMarkcount);
    const handleLike = async () => {
        try {
            const result = await UserlikeAction(tweetId, 'onClick');

            if (result && !result.hasOwnProperty('likeCount') && result.postId === tweetId) {
                setLiked(true);
                setLikeCount(likeCount + 1);
            } else {
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        } catch (error) {
            console.error('Error liking tweet:', error);
        } finally {
            router.refresh()
        }
    };

    const handleBookmarkChange = (bookmarked: boolean) => {
        setBookmarkcounter(bookmarked ? Bookmarkcounter + 1 : Bookmarkcounter - 1);
        setIsBookmarked(bookmarked);
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
                    <Link href={`/userprofile/${session === null ? undefined : id}`}>
                        <h5 className='transition-all hover:text-[#1d9bf0]'>{name}</h5>
                    </Link>
                    <p className='break-words'>{content}</p>
                    {imageUrl && <Image src={imageUrl} width={200} height={200} alt={content} />}

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
                            {/* <button className="handle-bookmark flex gap-2 items-center" onClick={handleBookMark}>
                                {isBookmarked ? <IoBookmarkSharp /> : <IoBookmarkOutline />}
                            </button> */}
                            <BookMarkPost tweetId={tweetId} isBookmarked={isBookmarked} onBookmarkChange={handleBookmarkChange}  bookmarkcounter={Bookmarkcounter} hasBookmarked={hasBookmarked}/>
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

