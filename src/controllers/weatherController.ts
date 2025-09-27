import { Request, Response } from 'express';
import { getWeather } from '../services/weather';

class WeatherController {
  public static async getWeather(req: Request, res: Response): Promise<void> {
    const city = req.query.city as string;
    const data = await getWeather(city);
    res.send({
      data
    });
  }
}

export default WeatherController;
