import type { NextFunction, Response, Request } from "express";
import { recipeService } from "../services/recipes.js";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new Error("User is required");
    const user = req.user;
    const { name, description, ingredients } = req.body;
    console.log(ingredients);
    const recipe = await recipeService.create({
      name,
      description,
      userId: user.id,
      ingredients,
    });
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Recipe ID is required");
    const user = req.user;
    if (!user) throw new Error("User is required");
    const recipe = await recipeService.getOne(user.id, id);
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User is required");
    const recipes = await recipeService.get(user.id);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
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
    if (!user) throw new Error("User is required");
    const { name, description, ingredients } = req.body;
    const recipe = await recipeService.update(user.id, id, {
      name,
      description,
      ingredients,
    });
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
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
    if (!user) throw new Error("User is required");
    const recipe = await recipeService.remove(user.id, id);
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const recipeController = {
  createRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
};
