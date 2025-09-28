import { Router } from 'express';
import WeatherController from '../controllers/weatherController';
import RequestValidator from '../middlewares/validator';
import CreateWeatherDataDTO from '../dtos/createWeatherData.dto';

const router = Router();

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
router.get('/', WeatherController.getWeathers);

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
router.get('/:id', WeatherController.getWeatherById);


/**
 * @swagger
 * /weather/cityName/{city}:
 *   get:
 *     summary: Retrieve weather data by city name
 *     description: Retrieve weather data from the database by city name.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: path
 *         name: city
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
router.get('/cityName/:city', WeatherController.getWeatherByCity);

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
router.post('/', RequestValidator.validate(CreateWeatherDataDTO) ,WeatherController.getWeatherFromSource);

export default router;
