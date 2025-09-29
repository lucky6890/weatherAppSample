import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import weatherRouter from "./routes/weather.route";
import { initializeDB } from "./database/database";
import initializeRedisClient from "./database/redis";

async function main() {
  const app = express();
  app.use(express.json());
  await initializeDB();
  await initializeRedisClient();

  app.use("/weather", weatherRouter);

  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Weather API",
        version: "1.0.0",
        description: "API documentation using Swagger for Weather App",
      },
    },
    apis: ["./src/routes/*.ts"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main().catch((err) => {
  console.error("Error starting the server:", err);
});
