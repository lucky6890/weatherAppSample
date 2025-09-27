import {getRedisClient} from '../database/redis';

const BASE_URL = 'https://api.openweathermap.org';

async function getWeatherDataByCity(city: string) {
  const {lat, lon} = await getCityLatLon(city);
  const data = await fetch(`${BASE_URL}/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
  if (!data.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return data.json();
}

async function getCityLatLon(city: string) {
  const data = await fetch(`${BASE_URL}/geo/1.0/direct?appid=${process.env.WEATHER_API_KEY}&q=${city}`);
  if (!data.ok) {
    throw new Error('Failed to fetch city data');
  }
  const json = await data.json();
  return {
    lat: json[0].lat,
    lon: json[0].lon
  };
}

function cacheWeatherData(city: string, data: any) {
  const client = getRedisClient();
  if (client) {
    client.set(city, JSON.stringify(data), {
      EX: 3600 // Cache for 1 hour
    }).catch(err => {
      console.error('Error caching weather data:', err);
    });
  }
}

async function getCachedWeatherData(city: string) {
  const client = getRedisClient();
  if (client) {
    const data = await client.get(city);
    if (data) {
      return JSON.parse(data);
    }
  }
  return null;
}

export async function getWeather(city: string) {
  const cachedData = await getCachedWeatherData(city);
  if (cachedData) {
    return cachedData;
  }

  const weatherData = await getWeatherDataByCity(city);
  cacheWeatherData(city, weatherData);
  return weatherData;
}

export default {
  getWeather
};

