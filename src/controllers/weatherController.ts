import { Request, Response } from 'express';
import { AppDataSource } from '../database/database'
import { Weather } from '../entities/weather';
import { getWeather } from '../services/weather';

class WeatherController {
  public static async getWeatherByCity(req: Request, res: Response): Promise<void> {
    const city = req.params.city as string;
    const data = await AppDataSource.createEntityManager().findOneBy(Weather, { cityName: city });
    res.send({
      message: "Weather data fetched by city",
      data
    });
  }

  public static async getWeathers(req: Request, res: Response): Promise<void> {
    console.log("Fetching all weather data...", req);
    const data = await AppDataSource.createEntityManager().findAndCount(Weather);
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
    const data = await getWeather(req.body.city);
    const oldRecord = await AppDataSource.createEntityManager().findOneBy(Weather, { cityName: data.name });
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
    const savedData = await AppDataSource.createEntityManager().save(newRecord);
    res.send({
      message: "Weather data fetched from source and saved to database.",
      data: savedData
    });
  }
}

export default WeatherController;
