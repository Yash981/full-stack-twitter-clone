import { db } from "@/lib/database/db"

export const BookMarkPost = async (userId: string, postId: string) => {

    try {
        const Bookmarkthepost = await db.bookMarks.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                }
            }
        })
        await db.post.update({
            where: { id: postId },
            data: { BookMarkCount: { increment: 1 } },
        });
        // console.log(Bookmarkthepost)
        return Bookmarkthepost
    }
    catch (error) {
        console.error("Error bookmarking post:", error);
        throw error;
    }


}

export const UnBookmark = async (userId: string, postId: string) => {
    const unBookmark = await db.bookMarks.deleteMany({
        where: {
            post: { id: postId },
            user: { id: userId },
        }
    })
    await db.post.update({
        where: { id: postId },
        data: { BookMarkCount: { decrement: 1 } },
    });
    return unBookmark
}