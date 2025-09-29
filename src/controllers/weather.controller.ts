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
    try {
      const data = await this.repository.findLatestByCity(
        city.charAt(0).toUpperCase() + city.slice(1)
      );
      if (!data) {
        res.status(400).send({
          success: false,
          message: "No weather data found for the specified city.",
        });
        return;
      }
      res.send({
        success: true,
        message: "Latest Weather data fetched by city",
        data,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error fetching latest weather data by city",
        error,
      });
    }
  }

  public async getWeathers(req: Request, res: Response): Promise<void> {
    console.log("Fetching all weather data...", req.body);
    try {
      const data = await this.repository.findAll();
      res.send({
        success: true,
        message: "All weather data fetched",
        data,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error fetching all weather data",
        error,
      });
    }
  }

  public async getWeatherById(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(400).send({ message: "ID parameter is required" });
      return;
    }
    try {
      const data = await this.repository.findById(req.params.id);
      if ("message" in data) {
        res.status(400).send(data);
        return;
      }
      res.send({
        success: true,
        message: "Weather data fetched by ID",
        data,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error fetching weather data by ID",
        error,
      });
    }
  }

  public async getWeatherFromSource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = await this.repository.save(req.body);
      if ("message" in data) {
        res.status(400).send(data);
        return;
      }
      res.send({
        success: true,
        message: "Weather data fetched from source and saved to database.",
        data,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error fetching weather data from source",
        error,
      });
    }
  }

  public async updateWeather(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(400).send({ message: "ID parameter is required" });
      return;
    }
    try {
      const data = await this.repository.update(req.params.id, req.body);
      if (data !== null) {
        if ("message" in data) {
          res.status(400).send(data);
          return;
        }
      }
      res.send({
        success: true,
        message: "Weather data updated successfully.",
        data,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error updating weather data",
        error,
      });
    }
  }

  public async deleteWeather(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      res.status(400).send({ message: "ID parameter is required" });
      return;
    }
    try {
      const data = await this.repository.delete(req.params.id);
      data
        ? res.send({
            message: "Weather data deleted successfully.",
            success: data,
          })
        : res.status(404).send({ message: "Record not found", success: false });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error deleting weather data",
        error,
      });
    }
  }
}

export default WeatherController;
