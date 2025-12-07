import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/express";
import { ingredientService } from "../services/ingredients.js";
import { InternalServerError } from "../middlewares/handleError.js";

const createRecipe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const { name, price, unit, amount } = req.body;
    const recipe = await ingredientService.create(
      name,
      price,
      unit,
      amount,
      user.id
    );
    res.status(201).json(recipe);
  } catch (error) {
    next(
      new InternalServerError("Internal server error, No ingredient created")
    );
  }
};

const getAllIngredients = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const ingredients = await ingredientService.getAll(user.id);
    res.status(200).json(ingredients);
  } catch (error) {
    next(
      new InternalServerError("Internal server error, No ingredients found")
    );
  }
};

const updateIngredient = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const { id } = req.params;
    const { name, price, unit, amount } = req.body;
    const ingredient = await ingredientService.update(
      user.id,
      id,
      name,
      price,
      unit,
      amount
    );
    res.status(200).json(ingredient);
  } catch (error) {
    next(
      new InternalServerError("Internal server error, No ingredient updated")
    );
  }
};

const deleteIngredient = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const { id } = req.params;
    const ingredient = await ingredientService.remove(user.id, id);
    res.status(200).json(ingredient);
  } catch (error) {
    next(
      new InternalServerError("Internal server error, No ingredient deleted")
    );
  }
};

export const ingredientController = {
  createRecipe,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
};
