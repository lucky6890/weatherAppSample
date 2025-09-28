import { getRedisClient } from "../database/redis";

const BASE_URL = "https://api.openweathermap.org";

async function getWeatherDataByCity(cityName: string, country: string) {
  const { lat, lon } = await getCityLatLon(cityName, country);
  const data = await fetch(
    `${BASE_URL}/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return data.json();
}

async function getCityLatLon(cityName: string, country: string) {
  const cachedData = await getCachedCityData(cityName, country);
  if (cachedData) {
    return cachedData;
  }
  const data = await fetch(
    `${BASE_URL}/geo/1.0/direct?appid=${process.env.WEATHER_API_KEY}&q=${cityName},${country}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch city data");
  }
  const json = await data.json();
  if (json.length === 0) {
    throw new Error("City not found");
  }
  const client = getRedisClient();
  if (client) {
    await client.set(
      `${cityName}:${country}`,
      JSON.stringify({
        lat: json[0].lat,
        lon: json[0].lon,
      }),
      { EX: 3600 }
    );
  }
  return {
    lat: json[0].lat,
    lon: json[0].lon,
  };
}

async function getCachedCityData(cityName: string, country: string) {
  const client = getRedisClient();
  if (client) {
    const data = await client.get(`${cityName}:${country}`);
    if (data) {
      return JSON.parse(data);
    }
  }
  return null;
}

export async function getWeather(cityName: string, country: string) {
  try {
    const weatherData = await getWeatherDataByCity(cityName, country);
    return weatherData;
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    return { message: "Error fetching weather data", errors: [error.message] };
  }
}

export default {
  getWeather,
};
