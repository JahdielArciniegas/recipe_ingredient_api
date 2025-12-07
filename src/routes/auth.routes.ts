import express from "express";
const authRouter = express.Router();
import { authController } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validateData.js";
import { userSchermaRegister, userSchermaLogin } from "../models/userSchema.js";

authRouter.post(
  "/register",
  validate(userSchermaRegister),
  authController.register
);
authRouter.post("/login", validate(userSchermaLogin), authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
