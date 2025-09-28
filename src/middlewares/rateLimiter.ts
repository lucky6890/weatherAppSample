import { NextFunction, Request, Response } from "express";
import { getRedisClient } from "../database/redis";

interface RateLimiterOptions {
  endpoint: string;
  ttl: number;
  limit: number;
}

export const rateLimiter = (rule: RateLimiterOptions) => {
  const { endpoint, ttl, limit } = rule;
  return async (req: Request, res: Response, next: NextFunction) => {
    const redisClient = getRedisClient();
    if (redisClient) {
      const redisId = `${endpoint}-${req.ip}`;
      const requests = await redisClient.incr(redisId);

      if (requests === 1) {
        await redisClient.expire(redisId, ttl);
      }

      if (requests > limit) {
        return res.status(429).send({
          message: "too much requests!",
        });
      }
      next();
    } else {
      console.log("Redis is not available!!!");
      next();
    }
  };
};
