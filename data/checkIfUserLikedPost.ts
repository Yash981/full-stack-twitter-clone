import { db } from "@/lib/database/db"

export const checkIfUserLikedPost = async (userId: string, postId: string) => {

    try {

        const like = await db.like.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId
                }
            }
        });
        // {
        //     id: 'clvnoo442000l169b8pfngw1p',
        //     postId: 'clvnnrivd0000169b69jm9zkm',
        //     userId: 'clv80szg80000wzprx6ile78o'
        //   }
        // {
        //     id: 'clvnor8fo000n169b7hkv7rvf',
        //     postId: 'clvnnrivd0000169b69jm9zkm',
        //     userId: 'clvkxari500006uug8e3xcrn9'
        //   }
        // if new user likes i'm getting null,'like',false
        // console.log(like, 'like',!!like)
        return !!like;
    } catch (error) {
        console.error("Error checking if user liked post:", error);
        throw error;
    }
}