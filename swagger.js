import swaggerAutogen from "swagger-autogen";

const outputfile = "./swagger.json";
const endpointsFiles = ["./index.ts"];

const doc = {
  info: {
    title: "Recipe Ingredients API",
    description: "Una API para gestionar recetas y ingredientes",
    version: "0.0.1",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

swaggerAutogen(outputfile, endpointsFiles, doc);
