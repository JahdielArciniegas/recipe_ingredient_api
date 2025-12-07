import { recipeService } from "../src/services/recipes";
import {
  createRecipe,
  deleteRecipe,
  getOneRecipe,
  getAllRecipes,
  updateRecipe,
} from "../src/repositories/recipe.repositories";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("../src/repositories/recipe.repositories", () => ({
  createRecipe: jest.fn(),
  deleteRecipe: jest.fn(),
  getOneRecipe: jest.fn(),
  getAllRecipes: jest.fn(),
  updateRecipe: jest.fn(),
}));

describe("recipeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call create recipe with correct params", async () => {
    (createRecipe as jest.Mock).mockResolvedValue({ id: "1" } as never);

    const ingredients = [
      { id: "ing1", amount: 2, unit: "g" },
      { id: "ing2", amount: 1, unit: "g" },
    ];

    const result = await recipeService.create(
      "name",
      "description",
      "userId",
      ingredients as any
    );

    expect(createRecipe).toHaveBeenCalledWith(
      "name",
      "description",
      "userId",
      ingredients as any
    );
    expect(result).toEqual({ id: "1" });
  });

  test("should throw if midding params", async () => {
    await expect(
      recipeService.create("", "description", "userId", [] as any)
    ).rejects.toThrow(
      "Name, description, userId, and ingredients are required"
    );
  });

  test("should call getAllRecipes", async () => {
    (getAllRecipes as jest.Mock).mockResolvedValue([{ id: "1" }] as never);
    const result = await recipeService.get("user1");
    expect(getAllRecipes).toHaveBeenCalledWith("user1");
    expect(result).toEqual([{ id: "1" }]);
  });

  test("should call getOneRecipe", async () => {
    (getOneRecipe as jest.Mock).mockResolvedValue({ id: "1" } as never);

    const result = await recipeService.getOne("user1", "rec1");

    expect(getOneRecipe).toHaveBeenCalledWith("user1", "rec1");
    expect(result).toEqual({ id: "1" });
  });

  test("should call updateRecipe", async () => {
    (updateRecipe as jest.Mock).mockResolvedValue({
      id: "1",
      name: "name",
      description: "description",
      ingredients: [{ id: "ing1", amount: 2, unit: "g" }],
    } as never);
    const result = await recipeService.update("user1", "rec1", {
      name: "name",
      description: "description",
      ingredients: [{ id: "ing1", amount: 2, unit: "g" }],
    });
    expect(updateRecipe).toHaveBeenCalledWith("user1", "rec1", {
      name: "name",
      description: "description",
      ingredients: [{ id: "ing1", amount: 2, unit: "g" }],
    });
    expect(result).toEqual({
      id: "1",
      name: "name",
      description: "description",
      ingredients: [{ id: "ing1", amount: 2, unit: "g" }],
    });
  });

  test("should throw if update params missing", async () => {
    await expect(
      recipeService.update("", "recipe1", {} as any)
    ).rejects.toThrow("userId, recipeId, and data are required");
  });

  test("should call deleteRecipe", async () => {
    (deleteRecipe as jest.Mock).mockResolvedValue({ deleted: true } as never);
    const result = await recipeService.remove("user1", "rec1");
    expect(deleteRecipe).toHaveBeenCalledWith("user1", "rec1");
    expect(result).toEqual({ deleted: true });
  });

  test("should throw if delete params missing", async () => {
    await expect(recipeService.remove("", "rec1")).rejects.toThrow(
      "userId and recipeId are required"
    );
  });
});
