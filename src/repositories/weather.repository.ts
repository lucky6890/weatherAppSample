import { Weather } from "../entities/weather.entity";
import { AppDataSource } from "../database/database";
import { getWeather } from "../externalServices/weather";
import CreateWeatherDataDTO from "../dtos/createWeatherData.dto";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import UpdateWeatherDataDTO from "../dtos/updateWeatherData.dto";

export default class WeatherRepository {
  weatherRepo: Repository<Weather>;

  constructor() {
    this.weatherRepo = AppDataSource.getRepository(Weather);
  }

  async findLatestByCity(cityName: string): Promise<Weather | null> {
    const data = await this.weatherRepo.find({
      where: [
        { cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1) },
      ],
      order: { fetchedAt: "DESC" },
      skip: 0,
      take: 1,
    });
    return data[0] || null;
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherRepo.find();
  }

  async findById(id: string): Promise<Weather | null> {
    return this.weatherRepo.findOneBy({ id });
  }

  async save(
    weatherData: CreateWeatherDataDTO
  ): Promise<Weather | { message: string; errors: any[] }> {
    const data = await getWeather(weatherData.cityName, weatherData.country);
    if ("message" in data) {
      return data;
    }
    const newRecord = AppDataSource.createEntityManager().create(Weather, {
      cityName: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    });
    const validated = await validate(newRecord);
    if (validated.length > 0) {
      return { message: "Validation failed", errors: validated };
    }
    const weather = this.weatherRepo.create(newRecord);
    return this.weatherRepo.save(weather);
  }

  async update(
    id: string,
    weatherData: Partial<UpdateWeatherDataDTO>
  ): Promise<Weather | null | { message: string; errors: any[] }> {
    const data = await this.weatherRepo.findOneBy({ id });
    if (!data) {
      return { message: "Record not found", errors: [] };
    }
    data.temperature = weatherData.temperature || data.temperature;
    data.description = weatherData.description || data.description;
    data.humidity = weatherData.humidity || data.humidity;
    data.windSpeed = weatherData.windSpeed || data.windSpeed;
    const validated = await validate(data);
    if (validated.length > 0) {
      return { message: "Validation failed", errors: validated };
    }
    await this.weatherRepo.update(id, data);
    const updatedData = await this.weatherRepo.findOneBy({ id });
    if (updatedData) {
      updatedData.updatedAt = new Date();
      const newData = await this.weatherRepo.save(updatedData);
      return newData;
    }
    return null;
  }

  async delete(
    id: string
  ): Promise<boolean | { message: string; errors: any[] }> {
    const data = await this.weatherRepo.count({ where: { id } });
    if (data === 0) {
      return { message: "Record not found", errors: [] };
    }
    const weather = await this.weatherRepo.delete(id);
    return weather.affected && weather.affected > 0 ? true : false;
  }
}
