import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Weather {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    test!: string
}