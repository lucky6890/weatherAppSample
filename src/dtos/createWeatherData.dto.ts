import { IsString } from "class-validator";

export default class CreateWeatherDataDTO {
  @IsString()
  cityName!: string;

  @IsString()
  country!: string;
}