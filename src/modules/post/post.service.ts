import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export interface ISearchPayload {
  searchString?: string | undefined;
  searchTags?: string[] | [];
}

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

const getAllPosts = async (payload: ISearchPayload) => {
  const andConditions: PostWhereInput[] = [];

  if (payload.searchString) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: payload.searchString,
            mode: "insensitive",
          },
        },

        {
          content: {
            contains: payload.searchString,
            mode: "insensitive",
          },
        },

        {
          tags: {
            has: payload.searchString,
          },
        },
      ],
    });
  }

  if (payload.searchTags && payload.searchTags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: payload.searchTags,
      },
    });
  }

  const result = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
  });
  return result;
};

const PostServices = {
  createPost,
  getAllPosts,
};

export default PostServices;
