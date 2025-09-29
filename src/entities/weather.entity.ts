import {
  IsISO31661Alpha2,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class Weather {
  @Index("idx_weather_id", { unique: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index("idx_weather_city", { unique: false })
  @Column("varchar")
  @IsString()
  @IsNotEmpty()
  cityName!: string;

  @Column("varchar")
  @IsString()
  @IsISO31661Alpha2()
  country!: string;

  @Column("float")
  @IsNumber()
  temperature!: number;

  @Column()
  @IsString()
  description!: string;

  @Column()
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity!: number;

  @Column("float")
  @IsNumber()
  @Min(0)
  windSpeed!: number;

  @Index("idx_weather_fetchedAt")
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fetchedAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
