import { Request, Response } from 'express';

class WeatherController {
  public static getWeather(req: Request, res: Response): void {
    console.log(req.body);
    res.send({
      message: "hello there!!!"
    });
  }
}

export default WeatherController;
