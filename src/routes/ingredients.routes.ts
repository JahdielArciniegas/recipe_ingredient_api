import { Router } from "express";
import { ingredientController } from "../controllers/ingredients.controllers";
import { verifyToken } from "../middlewares/verifyToken";
import { authToken } from "../middlewares/authToken";
import { validate } from "../middlewares/validateData";
import { ingredientSchema } from "../models/ingredientSchema";
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
