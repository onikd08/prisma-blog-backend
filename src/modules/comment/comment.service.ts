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

const CommentServices = {
  createComment,
  getCommentById,
};

export default CommentServices;
