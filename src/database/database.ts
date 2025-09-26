import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database:  process.env.DB_NAME || "weatherdb",
    synchronize: true, // Set to true only in development
    logging: true,
    entities: ["src/entities/*.ts"],
})

export async function initializeDB(): Promise<void> {
  try {
      await AppDataSource.initialize()
      console.log("Data Source has been initialized!")
    } catch (error) {
      console.error("Error during Data Source initialization", error)
  }
}
