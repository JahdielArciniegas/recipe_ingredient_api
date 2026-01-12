import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import { InternalServerError } from "../utils/errors.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      req.user = null;
      return next();
    }

    if (!JWT_SECRET) throw new InternalServerError("Internal Server Error");

    jwt.verify(token, JWT_SECRET);
  } catch {}

  next();
};
