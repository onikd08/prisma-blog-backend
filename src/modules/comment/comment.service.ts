import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
interface IComment {
  postId: string;
  content: string;
  parentId?: string;
  authorId: string;
}
const createComment = async (payload: IComment) => {
  const { postId, parentId } = payload;
  await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });
  if (parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: parentId,
      },
    });
  }

  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};

const getCommentById = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
};
const getCommentsByAuthorId = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};
const getAllComments = async () => {
  return await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const deleteCommentById = async (commentId: string, authorId: string) => {
  const commentData = await prisma.comment.findUnique({
    where: {
      id: commentId,
      authorId,
    },
  });

  if (!commentData) {
    throw new Error("Could not find the comment");
  }

  return prisma.comment.delete({
    where: {
      id: commentData.id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const updateComment = async (
  commentId: string,
  authorId: string,
  data: { content?: string; status?: CommentStatus }
) => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
  });

  return await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data,
  });
};

const CommentServices = {
  createComment,
  getCommentById,
  getCommentsByAuthorId,
  getAllComments,
  deleteCommentById,
  updateComment,
};

export default CommentServices;
