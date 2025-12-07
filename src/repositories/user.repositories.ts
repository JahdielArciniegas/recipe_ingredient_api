import prisma from "../lib/prisma.js";

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  return user;
}

export async function getOneUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
