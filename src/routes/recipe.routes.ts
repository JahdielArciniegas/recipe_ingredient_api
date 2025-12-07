import { Router } from "express";
import { recipeController } from "../controllers/recipe.controllers";
import { verifyToken } from "../middlewares/verifyToken";
import { authToken } from "../middlewares/authToken";
import { validate } from "../middlewares/validateData";
import { recipeSchema } from "../models/recipeSchema";

const recipeRouter = Router();

recipeRouter.post(
  "/",
  verifyToken,
  validate(recipeSchema),
  recipeController.createRecipe
);
recipeRouter.get("/", authToken, recipeController.getRecipes);
recipeRouter.get("/:id", authToken, recipeController.getRecipe);
recipeRouter.put(
  "/:id",
  verifyToken,
  validate(recipeSchema),
  recipeController.updateRecipe
);
recipeRouter.delete("/:id", verifyToken, recipeController.deleteRecipe);
export default recipeRouter;
