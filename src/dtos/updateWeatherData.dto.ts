import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export default class UpdateWeatherDataDTO {
  @IsOptional()
  @IsNumber()
  temperature!: number;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  windSpeed!: number;
}
