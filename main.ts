import 'reflect-metadata';
import express from 'express';
import weatherRouter from './src/routes/weather';
import { initializeDB } from './src/database/database';
import initializeRedisClient from './src/database/redis';

async function main() {
  const app = express();
  await initializeDB();
  await initializeRedisClient();
  
  app.use('/weather', weatherRouter);
  
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
}

main().catch(err => {
  console.error('Error starting the server:', err);
});
