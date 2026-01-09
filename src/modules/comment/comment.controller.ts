import { Request, Response } from "express";
import CommentServices from "./comment.service";
import { success } from "better-auth/*";

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
    res.status(200).json({
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
const getCommentsByAuthorId = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await CommentServices.getCommentsByAuthorId(
      authorId as string
    );
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get comments",
      error: error,
    });
  }
};

const getAllComments = async (req: Request, res: Response) => {
  try {
    const result = await CommentServices.getAllComments();
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get comments",
      error: error,
    });
  }
};

const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CommentServices.deleteCommentById(
      id as string,
      req.user?.id as string
    );
    res.status(200).json({
      success: true,
      message: "Comments deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete comment",
      error: error,
    });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await CommentServices.updateComment(
      commentId as string,
      req.user?.id as string,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Comments updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update comment",
      error: error,
    });
  }
};

const CommentController = {
  createComment,
  getCommentById,
  getCommentsByAuthorId,
  getAllComments,
  deleteCommentById,
  updateComment,
};

export default CommentController;
