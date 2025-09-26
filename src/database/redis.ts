import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database:  process.env.DB_NAME || "weatherapp",
    synchronize: true, // Set to true only in development
    logging: true,
})

export async function initializeDB(): Promise<void> {
  try {
      await AppDataSource.initialize()
      console.log("Data Source has been initialized!")
  } catch (error) {
      console.error("Error during Data Source initialization", error)
  }
}
