import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.js";
import { InternalServerError } from "../middlewares/handleError.js";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { newUser, token } = await authService.login(email, password);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ newUser });
  } catch (error) {
    next(new InternalServerError("Internal server error, No user logged in"));
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(new InternalServerError("Internal server error, No user registered"));
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(new InternalServerError("Internal server error, No user logged out"));
  }
};

export const authController = {
  login,
  register,
  logout,
};
