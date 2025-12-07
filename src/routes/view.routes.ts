import type { Response } from "express";
import type { AuthRequest } from "../types/express";
import express from "express";
import { authToken } from "../middlewares/authToken.js";
import { ingredientService } from "../services/ingredients.js";
import { recipeService } from "../services/recipes.js";
const viewRouter = express.Router();

viewRouter.get("/", authToken, (req: AuthRequest, res: Response) => {
  res.render("auth", { user: req.user });
});

viewRouter.get(
  "/view/ingredients",
  authToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user) {
      const ingredients = await ingredientService.getAll(req.user.id);
      res.render("ingredients", { user: req.user, ingredients: ingredients });
    }
  }
);

viewRouter.get(
  "/view/recipes",
  authToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user) {
      const recipes = await recipeService.get(req.user.id);
      const ingredients = await ingredientService.getAll(req.user.id);
      res.render("recipes", {
        user: req.user,
        recipes: recipes,
        ingredients: ingredients,
      });
    }
  }
);

viewRouter.get(
  "/view/recipes/:id",
  authToken,
  async (req: AuthRequest, res: Response) => {
    if (req.user) {
      const recipe = await recipeService.getOne(
        req.user.id,
        req.params.id as string
      );
      res.render("recipe", {
        user: req.user,
        recipe: recipe,
      });
    }
  }
);

export default viewRouter;
