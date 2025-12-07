import type { Request, Response } from "express";
import express from "express";
import { authToken } from "../middlewares/authToken";
import { ingredientService } from "../services/ingredients";
import { recipeService } from "../services/recipes";
const viewRouter = express.Router();

viewRouter.get("/", authToken, (req: Request, res: Response) => {
  res.render("auth", { user: req.user });
});

viewRouter.get(
  "/view/ingredients",
  authToken,
  async (req: Request, res: Response) => {
    const ingredients = await ingredientService.getAll(req.user.id);
    res.render("ingredients", { user: req.user, ingredients: ingredients });
  }
);

viewRouter.get(
  "/view/recipes",
  authToken,
  async (req: Request, res: Response) => {
    const recipes = await recipeService.get(req.user.id);
    const ingredients = await ingredientService.getAll(req.user.id);
    res.render("recipes", {
      user: req.user,
      recipes: recipes,
      ingredients: ingredients,
    });
  }
);

viewRouter.get(
  "/view/recipes/:id",
  authToken,
  async (req: Request, res: Response) => {
    const recipe = await recipeService.getOne(
      req.user.id,
      req.params.id as string
    );
    res.render("recipe", {
      user: req.user,
      recipe: recipe,
    });
  }
);

export default viewRouter;
