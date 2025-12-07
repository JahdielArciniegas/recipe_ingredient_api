import { ingredientService } from "../src/services/ingredients";
import {
  createIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
} from "../src/repositories/ingredients.repositories";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("../src/repositories/ingredients.repositories", () => ({
  createIngredient: jest.fn(),
  getAllIngredients: jest.fn(),
  updateIngredient: jest.fn(),
  deleteIngredient: jest.fn(),
}));

describe("ingredientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create ingredient", async () => {
    (createIngredient as jest.Mock).mockResolvedValue({
      id: "1",
      name: "ingredient",
      amount: 1,
      unit: "g",
      userId: "1",
      price: 1,
    } as never);
    const result = await ingredientService.create("ingredient", 1, "g", 1, "1");
    expect(createIngredient).toHaveBeenCalledWith("ingredient", 1, "g", 1, "1");
    expect(result).toEqual({
      id: "1",
      name: "ingredient",
      amount: 1,
      unit: "g",
      userId: "1",
      price: 1,
    });
  });

  test("should get all ingredients", async () => {
    (getAllIngredients as jest.Mock).mockResolvedValue([
      { id: "1", name: "ingredient" },
    ] as never);

    const result = await ingredientService.getAll("1");
    expect(getAllIngredients).toHaveBeenCalledWith("1");
    expect(result).toEqual([{ id: "1", name: "ingredient" }]);
  });

  test("should update ingredient", async () => {
    (updateIngredient as jest.Mock).mockResolvedValue({
      id: "1",
      name: "ingredient",
      price: 1,
      amount: 1,
      unit: "g",
      userId: "1",
    } as never);

    const result = await ingredientService.update(
      "1",
      "1",
      "ingredient",
      1,
      "g",
      1
    );
    expect(updateIngredient).toHaveBeenCalledWith("1", "1", {
      name: "ingredient",
      price: 1,
      amount: 1,
      unit: "g",
    });
    expect(result).toEqual({
      id: "1",
      name: "ingredient",
      price: 1,
      amount: 1,
      unit: "g",
      userId: "1",
    });
  });

  test("should throw if ingredientID is missing", async () => {
    await expect(
      ingredientService.update("1", "", "ingredient", 1, "g", 1)
    ).rejects.toThrow("No ingredient id");
  });

  test("should delete ingredient", async () => {
    (deleteIngredient as jest.Mock).mockResolvedValue({ id: "1" } as never);
    const result = await ingredientService.remove("1", "1");
    expect(deleteIngredient).toHaveBeenCalledWith("1", "1");
    expect(result).toEqual({ id: "1" });
  });
});
