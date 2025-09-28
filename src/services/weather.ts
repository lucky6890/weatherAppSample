import {getRedisClient} from '../database/redis';

const BASE_URL = 'https://api.openweathermap.org';

async function getWeatherDataByCity(cityName: string, country: string) {
  const {lat, lon} = await getCityLatLon(cityName, country);
  const data = await fetch(`${BASE_URL}/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
  if (!data.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return data.json();
}

async function getCityLatLon(cityName: string, country: string) {
  const data = await fetch(`${BASE_URL}/geo/1.0/direct?appid=${process.env.WEATHER_API_KEY}&q=${cityName},${country}`);
  if (!data.ok) {
    throw new Error('Failed to fetch city data');
  }
  const json = await data.json();
  return {
    lat: json[0].lat,
    lon: json[0].lon
  };
}

function cacheWeatherData(cityName: string, data: any) {
  const client = getRedisClient();
  if (client) {
    client.set(cityName, JSON.stringify(data), {
      EX: 3600 // Cache for 1 hour
    }).catch(err => {
      console.error('Error caching weather data:', err);
    });
  }
}

async function getCachedWeatherData(cityName: string) {
  const client = getRedisClient();
  if (client) {
    const data = await client.get(cityName);
    if (data) {
      return JSON.parse(data);
    }
  }
  return null;
}

export async function getWeather(cityName: string, country: string) {
  const cachedData = await getCachedWeatherData(`${cityName}-${country}`);
  if (cachedData) {
    return cachedData;
  }

  const weatherData = await getWeatherDataByCity(cityName, country);
  cacheWeatherData(`${cityName}-${country}`, weatherData);
  return weatherData;
}

export default {
  getWeather
};

