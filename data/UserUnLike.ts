import { db } from "@/lib/database/db";

export const UserUnLike = async (postId: string, userId: string) => {


    const unlike = await db.like.deleteMany({
        where: {
            post: { id: postId },
            user: { id: userId },
        },
    });
    await db.post.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
    });
    // console.log(unlike, 'unlike')
    const updatedPost = await db.post.findUnique({
        where: { id: postId },
        select: { likeCount: true },
    });

    // Return an object containing post ID, user ID, and updated like count
    return {
        postId: postId,
        userId: userId,
        likeCount: updatedPost ? updatedPost.likeCount : 0,
    };
}