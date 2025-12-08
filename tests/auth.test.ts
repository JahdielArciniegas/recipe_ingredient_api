import { createUser, getOneUser } from "../src/repositories/user.repositories";
import { authService } from "../src/services/auth";
import { jest, describe, test, expect } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../src/repositories/user.repositories", () => ({
  createUser: jest.fn(),
  getOneUser: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Register", () => {
  test("should hash password and create user", async () => {
    (getOneUser as jest.Mock).mockResolvedValue(null as never);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123" as never);
    (createUser as jest.Mock).mockResolvedValue({
      id: "1",
      email: "test@test.com",
      username: "test",
    } as never);

    const result = await authService.register({
      username: "test",
      email: "test@test.com",
      password: "hashed123",
    });

    expect(result).toEqual({
      id: "1",
      email: "test@test.com",
      username: "test",
    });
  });

  test("should throw if user exists", async () => {
    (getOneUser as jest.Mock).mockResolvedValue({
      email: "test@test.com",
    } as never);

    await expect(
      authService.register({
        username: "test",
        email: "test@test.com",
        password: "hashed123",
      })
    ).rejects.toThrow("User already registered");
  });
});

describe("login", () => {
  test("should login and return token", async () => {
    (getOneUser as jest.Mock).mockResolvedValue({
      id: "1",
      email: "test@test.com",
      username: "test",
      password: "hashed123",
    } as never);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true as never);
    (jwt.sign as jest.Mock).mockReturnValue("tokentest");

    const result = await authService.login({
      email: "test@test.com",
      password: "123456",
    });

    expect(getOneUser).toHaveBeenCalledWith("test@test.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed123");
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toEqual({
      newUser: {
        id: "1",
        email: "test@test.com",
        username: "test",
      },
      token: "tokentest",
    });
  });

  test("should throw if user not found", async () => {
    (getOneUser as jest.Mock).mockResolvedValue(null as never);
    await expect(
      authService.login({ email: "x@test.com", password: "123234" })
    ).rejects.toThrow("User not found");
  });

  test("should throw if invalid password", async () => {
    (getOneUser as jest.Mock).mockResolvedValue({
      id: "1",
      email: "test@test.com",
      username: "test",
      password: "hashed123",
    } as never);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false as never);
    await expect(
      authService.login({ email: "test@test.com", password: "456" })
    ).rejects.toThrow("Invalid password");
  });
});
