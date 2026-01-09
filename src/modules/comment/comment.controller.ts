import { Request, Response } from "express";
import CommentServices from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    req.body.authorId = req.user?.id;
    const result = await CommentServices.createComment(req.body);
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create comment",
      error: error,
    });
  }
};
const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CommentServices.getCommentById(id as string);
    res.status(201).json({
      success: true,
      message: "Comment fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get comment",
      error: error,
    });
  }
};

const CommentController = {
  createComment,
  getCommentById,
};

export default CommentController;
