import type { NextFunction, Request, Response } from "express";
import { ingredientService } from "../services/ingredients";
import { InternalServerError } from "../middlewares/handleError";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const ingredients = await ingredientService.getAll(user.id);
    res.status(200).json(ingredients);
  } catch (error) {
    next(
      new InternalServerError("Internal server error, No ingredients found")
    );
  }
};

const getOneIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { ingredientId } = req.body;
    const ingredient = await ingredientService.getOne(user.id, ingredientId);
    res.status(200).json(ingredient);
  } catch (error) {
    next(new InternalServerError("Internal server error, No ingredient found"));
  }
};

const updateIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
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
  getOneIngredient,
  updateIngredient,
  deleteIngredient,
};
