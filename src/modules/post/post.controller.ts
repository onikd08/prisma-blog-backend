import { Request, Response } from "express";
import PostServices from "./post.service";
import { Post } from "../../../generated/prisma/client";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.createPost(req.body);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create post",
      error: error,
    });
  }
};

const PostController = {
  createPost,
};

export default PostController;
