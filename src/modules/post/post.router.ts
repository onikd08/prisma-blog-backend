import { Router } from "express";
import PostController from "./post.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);
postRouter.post("/", auth(UserRoles.USER), PostController.createPost);

export default postRouter;
