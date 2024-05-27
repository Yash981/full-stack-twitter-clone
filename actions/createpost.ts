"use server";

import { auth } from "@/auth";
import { db } from "@/lib/database/db";
import { Redisclient } from "@/lib/redis";

interface Props {
  content: string;
  image: string;
}

export const createpost = async (data: Props) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({ where: { id: session.user?.id } });
  if (!user) {
    throw new Error("User not found");
  }
  const RateLimit = await Redisclient.get(`RATE_LIMIT:${user.id}`);
  if (RateLimit) {
    throw new Error("Rate limit exceeded Please wait...");
  }
  // let imageUrl;
  // if (data.image) {
  //   const { data: uploadData, error: uploadError } = await supabase.storage
  //     .from("twitter-image") // replace with your actual bucket name
  //     .upload(`public/${'xyzimage'}`, data.image);
  //   console.log(uploadData, uploadError);
  //   if (uploadError) {
  //     throw new Error(`Error uploading image: ${uploadError.message}`);
  //   }
  //   imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${uploadData.path}`;
  // }
  const tweet = await db.post.create({
    data: {
      content: data.content,
      ImageURL: data.image,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  await Redisclient.setex(`RATE_LIMIT:${user.id}`, 10, 1);
  await Redisclient.del(`posts`);
  return tweet;
};
