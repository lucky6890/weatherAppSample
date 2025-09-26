import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

// Singleton pattern for database connection
declare global {
  // eslint-disable-next-line no-var
  var dataSource: DataSource | undefined;
}

const getDataSource = () => {
  if (!global.dataSource) {
    global.dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false, // Set to true only in development
      logging: false,
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      migrations: [__dirname + '/../migrations/*.{ts,js}'],
    });
  }
  return global.dataSource;
};

export default getDataSource;
