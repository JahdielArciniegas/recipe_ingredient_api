import type { IngredientRecipe } from "./ingredients";

export interface Recipe {
  id: string;
  name: string;
  description: string;
  userId: string;
}

export interface RecipeWithIngredient extends Recipe {
  ingredients: IngredientRecipe[];
}

export type RecipeRegister = Omit<RecipeWithIngredient, "id">;
export type RecipeUpdate = Omit<RecipeWithIngredient, "id" | "userId">;
