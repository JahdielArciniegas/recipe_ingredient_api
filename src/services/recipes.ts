import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
} from "../repositories/recipe.repositories.js";
import type { RecipeRegister, RecipeUpdate } from "../types/recipe.js";

const create = async (recipeData: RecipeRegister) => {
  if (
    !recipeData.name ||
    !recipeData.description ||
    !recipeData.userId ||
    !recipeData.ingredients
  )
    throw new Error("Name, description, userId, and ingredients are required");
  return await createRecipe(
    recipeData.name,
    recipeData.description,
    recipeData.userId,
    recipeData.ingredients
  );
};

const get = async (userId: string) => {
  return await getAllRecipes(userId);
};

const getOne = async (userId: string, recipeId: string) => {
  return await getOneRecipe(userId, recipeId);
};

const update = async (userId: string, recipeId: string, data: RecipeUpdate) => {
  if (!userId || !recipeId || !data)
    throw new Error("userId, recipeId, and data are required");
  return await updateRecipe(userId, recipeId, data);
};

const remove = async (userId: string, recipeId: string) => {
  if (!userId || !recipeId) throw new Error("userId and recipeId are required");
  return await deleteRecipe(userId, recipeId);
};

export const recipeService = {
  create,
  get,
  update,
  remove,
  getOne,
};
