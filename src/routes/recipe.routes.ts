import { Router } from "express";
import { recipeController } from "../controllers/recipe.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authToken } from "../middlewares/authToken.js";
import { validate } from "../middlewares/validateData.js";
import { recipeSchema } from "../models/recipeSchema.js";

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
