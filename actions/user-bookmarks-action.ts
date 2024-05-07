"use server"

import { getAllBookmarksByUserId } from "@/data/getAllBookmarksByUserId"

export const UserBookmarks = async (userId: string) => {
    const bookmarkss = await getAllBookmarksByUserId(userId)
    return bookmarkss
}