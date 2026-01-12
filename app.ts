import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import ingredientRouter from "./src/routes/ingredients.routes.js";
import recipeRouter from "./src/routes/recipe.routes.js";
import cookieParser from "cookie-parser";
import viewRouter from "./src/routes/view.routes.js";
import rateLimit from "./src/middlewares/rateLimit.js";
import swaggerUi from "swagger-ui-express";
import handleError from "./src/middlewares/handleError.js";
import { verifyToken } from "./src/middlewares/verifyToken.js";
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
app.use(verifyToken);
app.set("view engine", "ejs");
app.use("/", viewRouter);
app.use("/auth", authRouter);
app.use("/ingredients", ingredientRouter);
app.use("/recipes", recipeRouter);
app.use("/error", handleError);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
