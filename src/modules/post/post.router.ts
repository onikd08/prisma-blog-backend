import { Router } from "express";
import PostController from "./post.controller";
import auth, { UserRoles } from "../../middlewares/auth";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);
postRouter.get(
  "/my-posts",
  auth(UserRoles.ADMIN, UserRoles.USER),
  PostController.getMyPosts
);
postRouter.get("/:id", PostController.getPostById);

postRouter.post(
  "/",
  auth(UserRoles.USER, UserRoles.ADMIN),
  PostController.createPost
);

export default postRouter;
