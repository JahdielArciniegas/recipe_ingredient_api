import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import { InternalServerError } from "../utils/errors.js";
import type { SessionUser } from "../types/session_user.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  req.user = null;
  try {
    if (!JWT_SECRET) throw new InternalServerError("Internal Server Error");

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data as SessionUser;
  } catch {}

  next();
};
