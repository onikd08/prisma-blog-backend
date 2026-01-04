import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getAllPosts = async (payload: { searchString: string | undefined }) => {
  const result = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: payload.searchString as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: payload.searchString as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: payload.searchString as string,
          },
        },
      ],
    },
  });
  return result;
};
const PostServices = {
  createPost,
  getAllPosts,
};

export default PostServices;
