import { Router } from "express";
import auth, { UserRoles } from "../../middlewares/auth";
import CommentController from "./comment.controller";

const commentRouter = Router();

commentRouter.post(
  "/",
  auth(UserRoles.ADMIN, UserRoles.USER),
  CommentController.createComment
);

export default commentRouter;
