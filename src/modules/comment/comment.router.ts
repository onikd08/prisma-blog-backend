import { Router } from "express";
import auth, { UserRoles } from "../../middlewares/auth";
import CommentController from "./comment.controller";

const commentRouter = Router();

commentRouter.post(
  "/",
  auth(UserRoles.ADMIN, UserRoles.USER),
  CommentController.createComment
);

commentRouter.get("/:id", CommentController.getCommentById);
commentRouter.get("/author/:authorId", CommentController.getCommentsByAuthorId);
commentRouter.get("/", CommentController.getAllComments);

commentRouter.delete("/:id", CommentController.deleteCommentById);

export default commentRouter;
