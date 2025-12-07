import { createUser, getOneUser } from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

const login = async (email: string, password: string) => {
  const user = await getOneUser(email);
  if (!user) throw new Error("User not found");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");
  const newUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { newUser, token };
};

const register = async (username: string, email: string, password: string) => {
  if (!username || !email || !password)
    throw new Error("Username, email, and password are required");
  const userRegistered = await getOneUser(email);
  if (userRegistered) throw new Error("User already registered");
  const hashedPassword = await bcrypt.hash(password, 10);
  const saveUser = await createUser(username, email, hashedPassword);
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
