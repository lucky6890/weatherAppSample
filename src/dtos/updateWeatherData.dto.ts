import { IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateWeatherDataDTO {
  @IsOptional()
  @IsNumber()
  temperature!: number;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsNumber()
  humidity!: number;

  @IsOptional()
  @IsNumber()
  windSpeed!: number;
}
