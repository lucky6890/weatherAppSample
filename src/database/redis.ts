import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  var __redis_client__: RedisClientType | undefined;
}

const getDefaultRedisUrl = () => {
  const host = process.env.REDIS_HOST || 'localhost';
  const port = process.env.REDIS_PORT || '6379';
  if (process.env.REDIS_URL) return process.env.REDIS_URL;
  return `redis://${host}:${port}`;
};


export async function initializeRedisClient(): Promise<RedisClientType> {
  if (global.__redis_client__ && global.__redis_client__.isReady) {
    return global.__redis_client__;
  }

  const url = getDefaultRedisUrl();
  const client: RedisClientType = createClient({ url });

  client.on('error', (err: unknown) => {
    console.error('Redis Client Error', err as any);
  });

  client.on('connect', () => {
    console.error('Redis Client connected!');
  });

  await client.connect();

  global.__redis_client__ = client;

  const shutdown = async () => {
    try {
      if (global.__redis_client__) {
        await global.__redis_client__.disconnect();
      }
    } catch (err) {
      console.error('Error during Redis disconnect', err as any);
    }
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);

  return client;
}

export function getRedisClient(): RedisClientType | undefined {
  return global.__redis_client__;
}

export default initializeRedisClient;