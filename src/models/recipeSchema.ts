import { z } from "zod";

const ingredientSchema = z.object({
  id: z.string().min(1, "Ingredient ID is required"),
  amount: z.number().positive("Amount must be positive"),
  unit: z.string(),
});

export const recipeSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name too short"),
    description: z.string().min(5, "Description too short"),
    ingredients: z
      .array(ingredientSchema)
      .min(1, "At least one ingredient is required"),
  }),
});
