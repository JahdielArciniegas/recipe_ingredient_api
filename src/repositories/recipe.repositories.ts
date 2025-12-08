import prisma from "../lib/prisma.js";
import type { IngredientRecipe } from "../types/ingredients.js";
import type { RecipeUpdate } from "../types/recipe.js";

export async function createRecipe(
  name: string,
  description: string,
  userId: string,
  ingredients: IngredientRecipe[]
) {
  return prisma.$transaction(async (tx) => {
    const recipe = await tx.recipe.create({
      data: {
        name,
        description,
        userId,
      },
    });

    await tx.recipeIngredient.createMany({
      data: ingredients.map(
        (ingredient: { id: string; amount: number; unit: string }) => ({
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit,
        })
      ),
    });

    return recipe;
  });
}

export const getAllRecipes = async (userId: string) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      userId,
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
  return recipes;
};

export const getPriceRecipe = async (recipeId: string) => {
  const ingredient = await prisma.recipeIngredient.findMany({
    where: {
      recipeId,
    },
    include: {
      ingredient: true,
    },
  });

  return ingredient.reduce((acc, item) => {
    return acc + item.amount * item.ingredient.price;
  }, 0);
};

export const getOneRecipe = async (userId: string, recipeId: string) => {
  const findRecipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
      userId,
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
  const priceRecipe = await getPriceRecipe(recipeId);
  const recipe = { ...findRecipe, priceRecipe };
  return recipe;
};

export const deleteRecipe = async (userId: string, recipeId: string) => {
  const recipe = await prisma.recipe.delete({
    where: {
      id: recipeId,
      userId,
    },
  });
  return recipe;
};

export const updateRecipe = async (
  userId: string,
  recipeId: string,
  data: RecipeUpdate
) => {
  prisma.$transaction(async (tx) => {
    const recipe = await tx.recipe.update({
      where: {
        id: recipeId,
        userId,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    await tx.recipeIngredient.deleteMany({
      where: {
        recipeId,
      },
    });

    const newIngredients = data.ingredients.map((ingredient) => ({
      recipeId,
      ingredientId: ingredient.id,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }));

    await tx.recipeIngredient.createMany({
      data: newIngredients,
    });

    return recipe;
  });
};
