export interface Ingredient {
  id: string;
  name: string;
  price: number;
  unit: string;
  amount: number;
  userId: string;
}

export interface IngredientRecipe {
  id: string;
  amount: number;
  unit: string;
}

export type IngredientRegister = Omit<Ingredient, "id">;
export type IngredientUpdate = Omit<Ingredient, "id" | "userId">;
