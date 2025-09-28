import { IsNumber, IsString } from "class-validator";

export default class UpdateWeatherDataDTO {
  @IsNumber()
  temperature!: number;

  @IsString()
  description!: string;

  @IsNumber()
  humidity!: number;

  @IsNumber()
  windSpeed!: number;
}
