import type { NextFunction, Response, Request } from "express";
import { ingredientService } from "../services/ingredients.js";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const { name, price, unit, amount } = req.body;
    const recipe = await ingredientService.create({
      name,
      price,
      unit,
      amount,
      userId: user.id,
    });
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const ingredients = await ingredientService.getAll(user.id);
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

const updateIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const { id } = req.params;
    if (!id) throw new Error("No ingredient id");
    const { name, price, unit, amount } = req.body;
    const ingredient = await ingredientService.update(user.id, id, {
      name: name as string,
      price: price as number,
      unit: unit as string,
      amount: amount as number,
    });
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

const deleteIngredient = async (
  req: Request,
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
    next(error);
  }
};

export const ingredientController = {
  createRecipe,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
};
