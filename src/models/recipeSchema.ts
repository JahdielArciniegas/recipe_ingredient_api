import { z } from "zod";

export const recipeSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name too short"),
    description: z.string().min(10, "Description too short"),
    ingredients: z.array(z.string()).min(1, "Ingredients too short"),
  }),
});
