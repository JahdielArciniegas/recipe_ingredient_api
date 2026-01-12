import type { Response, Request } from "express";
import express from "express";
import { ingredientService } from "../services/ingredients.js";
import { recipeService } from "../services/recipes.js";
const viewRouter = express.Router();

viewRouter.get("/", (req: Request, res: Response) => {
  res.render("auth", { user: req.user });
});

viewRouter.get("/view/ingredients", async (req: Request, res: Response) => {
  if (req.user) {
    const ingredients = await ingredientService.getAll(req.user.id);
    res.render("ingredients", { user: req.user, ingredients: ingredients });
  }
});

viewRouter.get("/view/recipes", async (req: Request, res: Response) => {
  if (req.user) {
    const recipes = await recipeService.get(req.user.id);
    const ingredients = await ingredientService.getAll(req.user.id);
    res.render("recipes", {
      user: req.user,
      recipes: recipes,
      ingredients: ingredients,
    });
  }
});

viewRouter.get("/view/recipes/:id", async (req: Request, res: Response) => {
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
});

export default viewRouter;
