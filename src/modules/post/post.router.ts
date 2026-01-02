import { Router } from "express";
import PostController from "./post.controller";

const postRouter = Router();

postRouter.post("/", PostController.createPost);

export default postRouter;
