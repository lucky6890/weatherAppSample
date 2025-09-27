import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Weather {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column("varchar", { unique: true })
    cityName!: string

    @Column("varchar")
    country!: string

    @Column("float")
    temperature!: number
    
    @Column()
    description!: string

    @Column()
    humidity!: number

    @Column("float")
    windSpeed!: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fetchedAt!: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date
}