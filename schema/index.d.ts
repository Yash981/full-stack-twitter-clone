import { Like } from "@prisma/client";

export interface Post {
  id: string;
  content: string;
  ImageURL?: string;
  author?: User;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  likeCount: number;
}

export interface CreateTweetData {
  content: string;
  image?: string; 

}

export interface User{
  id: string,
  name?: string,
  email?: string,
  emailVerified?: Date,
  image?: string,
  password?: string,
  post:Post[]
};



