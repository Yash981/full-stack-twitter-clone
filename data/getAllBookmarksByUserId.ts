import { db } from "@/lib/database/db"

export const getAllBookmarksByUserId = async (userId: string) => {
    const allBookmarks = await db.bookMarks.findMany({
        where: {
            user: {
                id: userId
            }
        },
        include: {
            post: {
                include: {
                    likes:true,
                    BookMarks: true,
                    author: true
                }
            },
            
        }

    })
    return allBookmarks.reverse()
}