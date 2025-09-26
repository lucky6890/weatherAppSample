import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Singleton pattern for Redis client
declare global {
  // eslint-disable-next-line no-var
  var redisClient: RedisClientType | undefined;
}

const getRedisClient = () => {
  if (!global.redisClient) {
    global.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`,
    });
    global.redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
    });
    global.redisClient.connect().catch(console.error);
  }
  return global.redisClient;
};

export default getRedisClient;
