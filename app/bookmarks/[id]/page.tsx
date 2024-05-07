
import { UserBookmarks } from '@/actions/user-bookmarks-action'
import FeedCard from '@/components/feedcard'
import React from 'react'

type Props = {

}

const UserBookMarks = async ({ params }: { params: { id: string } }) => {
    const bookmarks = await UserBookmarks(params.id)
    return (
        <section>
            <div className="flex justify-between mx-2 p-2">
                <h1 className='text-xl text-white p-2 px-4'>Bookmarks</h1>
                <button className='text-red-500 font-thin'>Clear All Bookmarks</button>
            </div>
            {params.id !== undefined && bookmarks && bookmarks.map((bookmark)=>{
                return (
                    <>
                    <FeedCard key={bookmark.id} image={bookmark.post.author?.image!} content={bookmark.post.content} name={bookmark?.post.author?.name!} id={bookmark.post.authorId} likes={bookmark.post.likeCount} tweetId={bookmark.postId} hasLiked={bookmark.post.likes && bookmark.post.likes.some((like)=>like.userId === params.id)} BookMarkcount={bookmark.post.BookMarkCount} hasBookmarked={bookmark.post.BookMarks && bookmark.post.BookMarks.some((bookmark)=>bookmark.userId === params.id)}></FeedCard>
                    </>
                )
            })}
            
        </section>
    )
}

export default UserBookMarks