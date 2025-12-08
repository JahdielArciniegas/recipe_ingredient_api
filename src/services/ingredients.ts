import {
  createIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
} from "../repositories/ingredients.repositories.js";
import type {
  IngredientRegister,
  IngredientUpdate,
} from "../types/ingredients.js";

const create = async (ingredientData: IngredientRegister) => {
  if (
    !ingredientData.name ||
    ingredientData.price == null ||
    !ingredientData.unit ||
    ingredientData.amount == null ||
    !ingredientData.userId
  )
    throw new Error("Name, price, unit, amount, and userId are required");
  const ingredient = await createIngredient(
    ingredientData.name,
    ingredientData.price,
    ingredientData.unit,
    ingredientData.amount,
    ingredientData.userId
  );
  return ingredient;
};

const getAll = async (userId: string) => {
  const ingredients = await getAllIngredients(userId);
  return ingredients;
};

const update = async (
  userId: string,
  ingredientId: string,
  ingredientData: IngredientUpdate
) => {
  if (!ingredientId) throw new Error("No ingredient id");
  if (
    !ingredientData.name ||
    ingredientData.price == null ||
    !ingredientData.unit ||
    ingredientData.amount == null
  )
    throw new Error(
      "Ingredient id, name, price, unit, and amount are required"
    );
  const updateIngredientData = {
    name: ingredientData.name,
    price: ingredientData.price,
    unit: ingredientData.unit,
    amount: ingredientData.amount,
  };
  const ingredient = await updateIngredient(
    userId,
    ingredientId,
    updateIngredientData
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
