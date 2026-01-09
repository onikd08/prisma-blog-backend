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

commentRouter.delete(
  "/:id",
  auth(UserRoles.ADMIN, UserRoles.USER),
  CommentController.deleteCommentById
);

commentRouter.patch(
  "/:commentId",
  auth(UserRoles.ADMIN, UserRoles.USER),
  CommentController.updateComment
);
commentRouter.patch(
  "/:commentId/moderate",
  auth(UserRoles.ADMIN),
  CommentController.moderateComment
);

export default commentRouter;
