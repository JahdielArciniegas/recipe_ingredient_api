import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
} from "../repositories/recipe.repositories";

const create = async (
  name: string,
  description: string,
  userId: string,
  ingredients: [
    {
      id: string;
      amount: number;
      unit: string;
    }
  ]
) => {
  // console.log(name, description, userId, ingredients);
  if (!name || !description || !userId || !ingredients)
    throw new Error("Name, description, userId, and ingredients are required");
  return await createRecipe(name, description, userId, ingredients);
};

const get = async (userId: string) => {
  return await getAllRecipes(userId);
};

const getOne = async (userId: string, recipeId: string) => {
  return await getOneRecipe(userId, recipeId);
};

const update = async (
  userId: string,
  recipeId: string,
  data: {
    name: string;
    description: string;
    ingredients: [{ id: string; amount: number; unit: string }];
  }
) => {
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
