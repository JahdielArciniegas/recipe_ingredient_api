import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from "../utils/errors.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw new UnauthorizedError("Unauthorized");

    if (!JWT_SECRET) throw new InternalServerError("Internal Server Error");

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) throw new ForbiddenError("Forbidden");
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
