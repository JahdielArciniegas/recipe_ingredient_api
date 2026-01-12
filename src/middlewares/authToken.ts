import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import { InternalServerError } from "../utils/errors.js";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    req.user = null;
    return next();
  }

  if (!JWT_SECRET)
    return next(new InternalServerError("No jwt secret defined"));
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return next();
    req.user = user;
    next();
  });
};
