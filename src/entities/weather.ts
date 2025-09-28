import { IsNumber, IsString } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Weather {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar", { unique: true })
    @IsString()
    cityName!: string

    @Column("varchar")
    @IsString()
    country!: string

    @Column("float")
    @IsNumber()
    temperature!: number
    
    @Column()
    @IsString()
    description!: string

    @Column()
    @IsNumber()
    humidity!: number

    @Column("float")
    @IsNumber()
    windSpeed!: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fetchedAt!: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date
}