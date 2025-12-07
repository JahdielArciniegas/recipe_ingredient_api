import {
  createIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
} from "../repositories/ingredients.repositories.js";

const create = async (
  name: string,
  price: number,
  unit: string,
  amount: number,
  userId: string
) => {
  if (!name || price == null || !unit || amount == null || !userId)
    throw new Error("Name, price, unit, amount, and userId are required");
  const ingredient = await createIngredient(name, price, unit, amount, userId);
  return ingredient;
};

const getAll = async (userId: string) => {
  const ingredients = await getAllIngredients(userId);
  return ingredients;
};

const update = async (
  userId: string,
  ingredientId: string | undefined,
  name: string,
  price: number,
  unit: string,
  amount: number
) => {
  if (!ingredientId) throw new Error("No ingredient id");
  if (!ingredientId || !name || price == null || !unit || amount == null)
    throw new Error(
      "Ingredient id, name, price, unit, and amount are required"
    );
  const ingredientData = {
    name,
    price,
    unit,
    amount,
  };
  const ingredient = await updateIngredient(
    userId,
    ingredientId,
    ingredientData
  );
  return ingredient;
};

const remove = async (userId: string, ingredientId: string | undefined) => {
  if (!ingredientId) throw new Error("No ingredient id");
  const ingredient = await deleteIngredient(userId, ingredientId);
  return ingredient;
};

export const ingredientService = {
  create,
  getAll,
  update,
  remove,
};
