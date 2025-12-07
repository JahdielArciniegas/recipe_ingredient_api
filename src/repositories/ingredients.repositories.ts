import prisma from "../lib/prisma.js";

export async function createIngredient(
  name: string,
  price: number,
  unit: string,
  amount: number,
  userId: string
) {
  const ingredient = await prisma.ingredient.create({
    data: {
      name,
      price,
      unit,
      amount,
      userId,
    },
  });
  return ingredient;
}

export async function getAllIngredients(userId: string) {
  const ingredients = await prisma.ingredient.findMany({
    where: {
      userId,
    },
  });
  return ingredients;
}

export async function getOneIngredient(userId: string, ingredientId: string) {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: ingredientId,
      userId,
    },
  });
  return ingredient;
}

export async function updateIngredient(
  userId: string,
  ingredientId: string,
  ingredientData: {
    name: string;
    price: number;
    unit: string;
    amount: number;
  }
) {
  const ingredient = await prisma.ingredient.update({
    where: {
      id: ingredientId,
      userId,
    },
    data: ingredientData,
  });
  return ingredient;
}

export async function deleteIngredient(userId: string, ingredientId: string) {
  const ingredient = await prisma.ingredient.delete({
    where: {
      id: ingredientId,
      userId,
    },
  });
  return ingredient;
}
