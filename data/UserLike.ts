import { db } from "@/lib/database/db";


export const UserLike = async (postId: string, userId: string) => {
    // console.log(postId, userId)

    try {
        const post = await db.post.findUnique({ where: { id: postId } });
        if (!post) {
            throw new Error("Post not found");
        }
        
        // Create the like
        const like = await db.like.create({
            data: {
                post: { connect: { id: postId } },
                user: { connect: { id: userId } },
            },
        });

        // Increment the like count for the post
        await db.post.update({
            where: { id: postId },
            data: { likeCount: { increment: 1 } },
        });

        return like;
    } catch (error) {
        console.error("Error creating like:", error);
        throw error; // Rethrow the error for handling in the caller
    }
}