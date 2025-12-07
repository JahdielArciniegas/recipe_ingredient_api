import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";
import { InternalServerError } from "./handleError.js";

export const authToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    req.user = null;
    return next();
  }

  if (!JWT_SECRET) return next(new InternalServerError("No secret"));
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return next();
    req.user = user;
    next();
  });
};
