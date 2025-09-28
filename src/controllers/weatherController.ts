import { Request, Response } from 'express';
import { AppDataSource } from '../database/database'
import { Weather } from '../entities/weather';
import { getWeather } from '../services/weather';
import { validate } from 'class-validator';

class WeatherController {
  public static async getWeatherByCity(req: Request, res: Response): Promise<void> {
    const city = req.params.city as string;
    const data = await AppDataSource.createEntityManager().findOneBy(Weather, { cityName: city.charAt(0).toUpperCase() + city.slice(1) });
    res.send({
      message: "Weather data fetched by city",
      data
    });
  }

  public static async getWeathers(req: Request, res: Response): Promise<void> {
    console.log("Fetching all weather data...", req.body);
    const data = await AppDataSource.createEntityManager().find(Weather);
    res.send({
      message: "All weather data fetched",
      data
    });
  }

  public static async getWeatherById(req: Request, res: Response): Promise<void> {
    const data = await AppDataSource.createEntityManager().findBy(Weather, { id: req.params.id });
    res.send({
      message: "Weather data fetched by ID",
      data
    });
  }

  public static async getWeatherFromSource(req: Request, res: Response): Promise<void> {
    const data = await getWeather(req.body.cityName, req.body.country);
    const oldRecord = await AppDataSource.createEntityManager().findOneBy(Weather, { cityName: data.name, country: req.body.country });
    if (oldRecord) {
      res.status(400).send({ message: "City weather data already exists in the database." });
      return;
    }
    const newRecord = AppDataSource.createEntityManager().create(Weather, {
      cityName: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    })
    const validated = await validate(newRecord);
    if (validated.length > 0) {
      res.status(400).send({ message: "Validation failed", errors: validated });
      return;
    }
    const savedData = await AppDataSource.createEntityManager().save(newRecord);
    res.send({
      message: "Weather data fetched from source and saved to database.",
      data: savedData
    });
  }
}

export default WeatherController;
