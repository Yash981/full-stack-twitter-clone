import { db } from "@/lib/database/db";

export const checkIfUserBookMarked = async (userId: string, postId: string) => {

    const bookmark = await db.bookMarks.findMany({
        where: {
            post: { id: postId },
            user: { id: userId }
        }
    })
    return bookmark.length > 0;
}
