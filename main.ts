import 'reflect-metadata';
import express from 'express';
import weatherRouter from './src/routes/weather';

const app = express();
const port = 3000;

app.use('/weather', weatherRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
