import { Router } from "express";
import { recipeController } from "../controllers/recipe.controllers.js";
import { validate } from "../middlewares/validateData.js";
import { recipeSchema } from "../models/recipeSchema.js";

const recipeRouter = Router();

recipeRouter.post("/", validate(recipeSchema), recipeController.createRecipe);
recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.get("/:id", recipeController.getRecipe);
recipeRouter.put("/:id", validate(recipeSchema), recipeController.updateRecipe);
recipeRouter.delete("/:id", recipeController.deleteRecipe);
export default recipeRouter;
