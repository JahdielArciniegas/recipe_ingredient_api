import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";
import { InternalServerError, UnauthorizedError } from "./handleError";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
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
