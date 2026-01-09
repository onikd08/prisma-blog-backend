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
    const {
      search,
      tags,
      isFeatured,
      status,
      authorId,
      limit,
      page,
      sortBy,
      sortOrder,
    } = req.query;
    const limitNumber = Number(limit ?? 10);
    const pageNumber = Number(page ?? 1);
    const payload = {
      searchString: typeof search === "string" ? search : undefined,
      searchTags: typeof tags === "string" ? tags.split(",") : undefined,
      searchByIsFeatured:
        typeof isFeatured === "string" ? isFeatured : undefined,
      searchByStatus: (status as PostStatus) || undefined,
      searchByAuthorId: typeof authorId === "string" ? authorId : undefined,
      page: pageNumber,
      limit: limitNumber,
      sortBy: typeof sortBy === "string" ? sortBy : undefined,
      sortOrder: typeof sortOrder === "string" ? sortOrder : undefined,
    };

    const { result, total } = await PostServices.getAllPosts(
      payload as IFilterPayload
    );
    res.status(200).json({
      success: true,
      message: "All posts have been fetched successfully",
      pagination: {
        totalPosts: total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
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

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await PostServices.getPostById(id as string);
    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const data = await PostServices.getMyPosts(req.user.id as string);
    res.status(200).json({
      success: true,
      message: "Posts retrived successfully",
      count: data.length,
      data,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to retrive posts";
    res.status(400).json({
      success: false,
      message: errorMessage,
      error: error,
    });
  }
};

const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
};

export default PostController;
