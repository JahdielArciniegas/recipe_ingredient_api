import { createUser, getOneUser } from "../repositories/user.repositories.js";
import type { UserLogin, UserRegister } from "../types/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import {
  ValidationError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors.js";

const login = async (user: UserLogin) => {
  const userFound = await getOneUser(user.email);
  if (!userFound) throw new NotFoundError("User not found");
  const isPasswordValid = await bcrypt.compare(
    user.password,
    userFound.password
  );
  if (!isPasswordValid) throw new ValidationError("Invalid password");
  const newUser = {
    id: userFound.id,
    email: user.email,
    username: userFound.username,
  };

  if (!JWT_SECRET) throw new InternalServerError("JWT_SECRET is not defined");

  const token = jwt.sign(
    { id: userFound.id, email: userFound.email, username: userFound.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { newUser, token };
};

const register = async (user: UserRegister) => {
  if (!user.username || !user.email || !user.password)
    throw new ValidationError("Username, email, and password are required");
  const userRegistered = await getOneUser(user.email);
  if (userRegistered) throw new ValidationError("User already registered");
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const saveUser = await createUser(user.username, user.email, hashedPassword);
  const newUser = {
    id: saveUser.id,
    email: saveUser.email,
    username: saveUser.username,
  };
  return newUser;
};

export const authService = {
  login,
  register,
};
