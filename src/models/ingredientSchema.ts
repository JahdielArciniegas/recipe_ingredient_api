import { z } from "zod";

export const ingredientSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name too short"),
    amount: z.number().min(1, "Amount too short"),
    unit: z.string(),
    price: z.number("No number"),
  }),
});
