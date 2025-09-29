import { IsISO31661Alpha2, IsNotEmpty, IsString } from "class-validator";

export default class CreateWeatherDataDTO {
  @IsString()
  @IsNotEmpty()
  cityName!: string;

  @IsString()
  @IsISO31661Alpha2()
  country!: string;
}
