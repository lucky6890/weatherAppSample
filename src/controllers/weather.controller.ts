import { Request, Response } from "express";
import WeatherRepository from "../repositories/weather.repository";

class WeatherController {
  private repository: WeatherRepository;
  constructor(repository: WeatherRepository) {
    this.repository = repository;
  }

  public async getLatestWeatherByCity(
    req: Request,
    res: Response
  ): Promise<void> {
    if (!req.params.cityName) {
      res.status(400).send({ message: "City parameter is required" });
      return;
    }
    const city = req.params.cityName as string;
    const data = await this.repository.findLatestByCity(
      city.charAt(0).toUpperCase() + city.slice(1)
    );
    res.send({
      message: "Latest Weather data fetched by city",
      data,
    });
  }

  public async getWeathers(req: Request, res: Response): Promise<void> {
    console.log("Fetching all weather data...", req.body);
    const data = await this.repository.findAll();
    res.send({
      message: "All weather data fetched",
      data,
    });
  }

  public async getWeatherById(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(400).send({ message: "ID parameter is required" });
      return;
    }
    const data = await this.repository.findById(req.params.id);
    res.send({
      message: "Weather data fetched by ID",
      data,
    });
  }

  public async getWeatherFromSource(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = await this.repository.save(req.body);
    if ("message" in data) {
      res.status(400).send(data);
      return;
    }
    res.send({
      message: "Weather data fetched from source and saved to database.",
      data,
    });
  }

  public async updateWeather(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(400).send({ message: "ID parameter is required" });
      return;
    }
    const data = await this.repository.update(req.params.id, req.body);
    if (data !== null) {
      if ("message" in data) {
        res.status(400).send(data);
        return;
      }
    }
    res.send({
      message: "Weather data updated successfully.",
      data,
    });
  }

  public async deleteWeather(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(400).send({ message: "ID parameter is required" });
      return;
    }
    const data = await this.repository.delete(req.params.id);
    res.send({
      message: data
        ? "Weather data deleted successfully."
        : "Weather data not found.",
      success: data,
    });
  }
}

export default WeatherController;
