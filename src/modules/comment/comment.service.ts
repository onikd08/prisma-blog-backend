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
  return await prisma.comment.findMany();
};

const CommentServices = {
  createComment,
  getCommentById,
  getCommentsByAuthorId,
  getAllComments,
};

export default CommentServices;
