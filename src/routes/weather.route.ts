import { Router } from "express";
import WeatherController from "../controllers/weather.controller";
import RequestValidator from "../middlewares/validator";
import CreateWeatherDataDTO from "../dtos/createWeatherData.dto";
import WeatherRepository from "../repositories/weather.repository";
import UpdateWeatherDataDTO from "../dtos/updateWeatherData.dto";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = Router();
const weatherController = new WeatherController(new WeatherRepository());

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Retrieve a list of weather data
 *     description: Retrieve a list of weather data from the database.
 *     tags:
 *       - Weather
 *     responses:
 *       200:
 *         description: A list of weather data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All weather data fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       cityName:
 *                         type: string
 *                         example: "London"
 *                       country:
 *                         type: string
 *                         example: "GB"
 *                       temperature:
 *                         type: number
 *                         format: float
 *                         example: 285.32
 *                       description:
 *                         type: string
 *                         example: "light rain"
 *                       humidity:
 *                         type: integer
 *                         example: 81
 *                       windSpeed:
 *                         type: number
 *                         format: float
 *                         example: 4.1
 *                       fetchedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T12:34:56Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T12:34:56Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T12:34:56Z"
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/",
  rateLimiter({ endpoint: `get/weather`, limit: 5, ttl: 60 }),
  (req, res) => weatherController.getWeathers(req, res)
);

/**
 * @swagger
 * /weather/{id}:
 *   get:
 *     summary: Retrieve weather data by ID
 *     description: Retrieve weather data from the database by its unique ID.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the weather data.
 *     responses:
 *       200:
 *         description: Weather data fetched by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weather data fetched by ID
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     cityName:
 *                       type: string
 *                       example: "London"
 *                     country:
 *                       type: string
 *                       example: "GB"
 *                     temperature:
 *                       type: number
 *                       format: float
 *                       example: 285.32
 *                     description:
 *                       type: string
 *                       example: "light rain"
 *                     humidity:
 *                       type: integer
 *                       example: 81
 *                     windSpeed:
 *                       type: number
 *                       format: float
 *                       example: 4.1
 *                     fetchedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *       404:
 *         description: Weather data not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:id",
  rateLimiter({ endpoint: `getById/weather`, limit: 30, ttl: 60 }),
  (req, res) => weatherController.getWeatherById(req, res)
);

/**
 * @swagger
 * /weather/latest/{cityName}:
 *   get:
 *     summary: Retrieve latest weather data by city name
 *     description: Retrieve latest weather data from the database by city name.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: path
 *         name: cityName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the city.
 *     responses:
 *       200:
 *         description: Weather data fetched by city.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weather data fetched by city
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     cityName:
 *                       type: string
 *                       example: "London"
 *                     country:
 *                       type: string
 *                       example: "GB"
 *                     temperature:
 *                       type: number
 *                       format: float
 *                       example: 285.32
 *                     description:
 *                       type: string
 *                       example: "light rain"
 *                     humidity:
 *                       type: integer
 *                       example: 81
 *                     windSpeed:
 *                       type: number
 *                       format: float
 *                       example: 4.1
 *                     fetchedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *       404:
 *         description: Weather data not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/latest/:cityName",
  rateLimiter({ endpoint: `latest/weather`, limit: 30, ttl: 60 }),
  (req, res) => weatherController.getLatestWeatherByCity(req, res)
);

/**
 * @swagger
 * /weather:
 *   post:
 *     summary: Fetch and store weather data by city name
 *     description: Fetch weather data from the external API by city name and store it in the database.
 *     tags:
 *       - Weather
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *                 example: "London"
 *               country:
 *                 type: string
 *                 example: "GB"
 *     responses:
 *       200:
 *         description: Weather data fetched from source and saved to database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weather data fetched from source and saved to database.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     cityName:
 *                       type: string
 *                       example: "London"
 *                     country:
 *                       type: string
 *                       example: "GB"
 *                     temperature:
 *                       type: number
 *                       format: float
 *                       example: 285.32
 *                     description:
 *                       type: string
 *                       example: "light rain"
 *                     humidity:
 *                       type: integer
 *                       example: 81
 *                     windSpeed:
 *                       type: number
 *                       format: float
 *                       example: 4.1
 *                     fetchedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:34:56Z"
 *       400:
 *         description: City weather data already exists in the database.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  RequestValidator.validate(CreateWeatherDataDTO),
  rateLimiter({ endpoint: `post/weather`, limit: 5, ttl: 60 }),
  (req, res) => weatherController.getWeatherFromSource(req, res)
);

/**
 * @swagger
 * /weather/{id}:
 *   put:
 *     summary: Update weather data by ID
 *     description: Update existing weather data in the database by its unique ID.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the weather data to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *                 format: float
 *                 example: 290.15
 *               description:
 *                 type: string
 *                 example: "clear sky"
 *               humidity:
 *                 type: integer
 *                 example: 60
 *               windSpeed:
 *                 type: number
 *                 format: float
 *                 example: 3.5
 *     responses:
 *       200:
 *         description: Weather data updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weather data updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     cityName:
 *                       type: string
 *                       example: "London"
 *                     country:
 *                       type: string
 *                       example: "GB"
 *                     temperature:
 *                       type: number
 *                       format: float
 *                       example: 290.15
 *                     description:
 *                       type: string
 *                       example: "clear sky"
 *                     humidity:
 *                       type: integer
 *                       example: 60
 *                     windSpeed:
 *                       type: number
 *                       format: float
 *                       example: 3.5
 *       400:
 *         description: Validation failed or weather data not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  rateLimiter({ endpoint: `put/weather`, limit: 10, ttl: 60 }),
  RequestValidator.validate(UpdateWeatherDataDTO),
  (req, res) => weatherController.updateWeather(req, res)
);

/**
 * @swagger
 * /weather/{id}:
 *   delete:
 *     summary: Delete weather data by ID
 *     description: Delete existing weather data from the database by its unique ID.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the weather data to be deleted.
 *     responses:
 *       200:
 *         description: Weather data deleted successfully or not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Weather data deleted successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: ID parameter is required.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  rateLimiter({ endpoint: `delete/weather`, limit: 10, ttl: 60 }),
  (req, res) => weatherController.deleteWeather(req, res)
);

export default router;
