import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        name: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Post creation failed",
        });
      }

      if (!session.user.emailVerified) {
        return res.status(401).json({
          success: false,
          message: "Please verify your email",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
        name: session.user.name,
      };

      if (roles.length && !roles.includes(req.user.role as UserRoles)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
