import type { NextFunction, Request, Response } from "express";
import { recipeService } from "../services/recipes";
import { InternalServerError } from "../middlewares/handleError";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { name, description, ingredients } = req.body;
    const recipe = await recipeService.create(
      name,
      description,
      user.id,
      ingredients
    );
    res.status(201).json(recipe);
  } catch (error) {
    next(new InternalServerError("Internal server error, No recipe created"));
  }
};

const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Recipe ID is required");
    const user = req.user;
    const recipe = await recipeService.getOne(user.id, id);
    res.status(200).json(recipe);
  } catch (error) {
    next(new InternalServerError("Internal server error, No recipe found"));
  }
};

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const recipes = await recipeService.get(user.id);
    res.status(200).json(recipes);
  } catch (error) {
    next(new InternalServerError("Internal server error, No recipes found"));
  }
};

const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Recipe ID is required");
    const user = req.user;
    const { name, description, ingredients } = req.body;
    const recipe = await recipeService.update(user.id, id, {
      name,
      description,
      ingredients,
    });
    res.status(200).json(recipe);
  } catch (error) {
    next(new InternalServerError("Internal server error, No recipe updated"));
  }
};

const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Recipe ID is required");
    const user = req.user;
    const recipe = await recipeService.remove(user.id, id);
    res.status(200).json(recipe);
  } catch (error) {
    next(new InternalServerError("Internal server error, No recipe deleted"));
  }
};

export const recipeController = {
  createRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
};
