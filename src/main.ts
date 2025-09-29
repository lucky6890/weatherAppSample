import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import weatherRouter from "./routes/weather.route";
import { initializeDB } from "./database/database";
import initializeRedisClient from "./database/redis";

/**
 * this configuration is set to development mode
 * for production, please make sure to set synchronize to false
 * and handle migrations properly.
 * and change the dockerfile and docker-compose files accordingly.
 * you can use multistage builds in dockerfile to optimize the image size.
 * or you can use a different dockerfile for production.
 * or you can use npx tsc to compile the typescript code to javascript and run the javascript code in production.
 * also make sure to set the environment variables properly in production.
 * the target of this project is creating an application to work properly and challenging some skills for development
 */

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
