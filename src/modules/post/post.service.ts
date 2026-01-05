import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export interface IFilterPayload {
  searchString?: string;
  searchTags?: string[];
  searchByIsFeatured?: string;
  searchByStatus?: PostStatus;
  searchByAuthorId?: string;
  limit: number;
  page: number;
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

const getAllPosts = async (payload: IFilterPayload) => {
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

  if (payload.searchByIsFeatured && payload.searchByIsFeatured === "true") {
    andConditions.push({
      isFeatured: true,
    });
  }

  if (payload.searchByIsFeatured && payload.searchByIsFeatured === "false") {
    andConditions.push({
      isFeatured: false,
    });
  }

  if (payload.searchByStatus) {
    andConditions.push({
      status: payload.searchByStatus,
    });
  }

  if (payload.searchByAuthorId) {
    andConditions.push({
      authorId: payload.searchByAuthorId,
    });
  }

  const skip = (payload.page - 1) * payload.limit;
  console.log({
    page: payload.page,
    limit: payload.limit,
    skip,
  });

  const result = await prisma.post.findMany({
    take: payload.limit,
    skip,
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
