import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes";
import ingredientRouter from "./src/routes/ingredients.routes";
import recipeRouter from "./src/routes/recipe.routes";
import cookieParser from "cookie-parser";
import viewRouter from "./src/routes/view.routes";
import rateLimit from "./src/middlewares/rateLimit";
import swaggerUi from "swagger-ui-express";
const { default: swaggerDocument } = await import("./swagger.json", {
  with: {
    type: "json",
  },
});

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(rateLimit);
app.use(express.json());
app.set("view engine", "ejs");
app.use("/", viewRouter);
app.use("/auth", authRouter);
app.use("/ingredients", ingredientRouter);
app.use("/recipes", recipeRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
