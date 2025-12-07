import type { Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  } | null;
}
