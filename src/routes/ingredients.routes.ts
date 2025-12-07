import { Router } from "express";
import { ingredientController } from "../controllers/ingredients.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authToken } from "../middlewares/authToken.js";
import { validate } from "../middlewares/validateData.js";
import { ingredientSchema } from "../models/ingredientSchema.js";
const ingredientRouter = Router();
ingredientRouter.post(
  "/",
  verifyToken,
  validate(ingredientSchema),
  ingredientController.createRecipe
);
ingredientRouter.get("/", authToken, ingredientController.getAllIngredients);
ingredientRouter.put(
  "/:id",
  verifyToken,
  validate(ingredientSchema),
  ingredientController.updateIngredient
);
ingredientRouter.delete(
  "/:id",
  verifyToken,
  ingredientController.deleteIngredient
);
export default ingredientRouter;
