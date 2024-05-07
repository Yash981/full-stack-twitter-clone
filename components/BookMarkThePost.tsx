"use client"
import { AddToBookmark } from "@/actions/addToBookmark.action";
// import { AddToBookmark } from "@/actions/addToBookmark";
import { useBookMarkPost } from "@/hooks/customHooks";
import { useSession } from "next-auth/react";
// import { revalidatePath } from "next/cache";
// import { useCallback, useState } from "react";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";

export default function BookMarkPost({
    tweetId,
    isBookmarked,
    onBookmarkChange,
    bookmarkcounter,
    hasBookmarked
}: {
    tweetId: string;
    isBookmarked: boolean;
    onBookmarkChange: (bookmarked: boolean) => void;
    bookmarkcounter: number
    hasBookmarked: boolean
}) {
    const {data:session} = useSession()
    const HandleBookMark = async () => {
        try {
            if(session === null) return

            const res = await AddToBookmark(tweetId);
            if (res?.success) {
                onBookmarkChange(res?.success);
            } else {
                //@ts-ignore
                onBookmarkChange(res?.success);
            }
        } catch (error) {
            console.log(error, 'error');
        }
    };
    // console.log(bookmarkcounter, 'BookMarkcount')
    return (
        <div>
            <button
                className="handle-bookmark flex gap-2 items-center"
                onClick={HandleBookMark}
            >
                <div className="flex gap-2 items-center">
                    {hasBookmarked || isBookmarked?
                        <IoBookmarkSharp />
                        : <IoBookmarkOutline />}
                    <span>{bookmarkcounter < 0 ? 0 : bookmarkcounter}</span>
                </div>
            </button>
        </div>
    )
}