import { Request, Response } from "express";
import PostServices, { IFilterPayload } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "Failed to create post, Please login",
      });
    }
    const result = await PostServices.createPost(req.body, req.user.id);
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

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search, tags, isFeatured, status, authorId, limit, page } =
      req.query;
    const payload = {
      searchString: typeof search === "string" ? search : undefined,
      searchTags: typeof tags === "string" ? tags.split(",") : undefined,
      searchByIsFeatured:
        typeof isFeatured === "string" ? isFeatured : undefined,
      searchByStatus: (status as PostStatus) || undefined,
      searchByAuthorId: typeof authorId === "string" ? authorId : undefined,
      page: Number(page ?? 1),
      limit: Number(limit ?? 10),
    };

    const result = await PostServices.getAllPosts(payload as IFilterPayload);
    res.status(200).json({
      success: true,
      message: "All posts have been fetched successfully",
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch posts",
      error: error,
    });
  }
};

const PostController = {
  createPost,
  getAllPosts,
};

export default PostController;
