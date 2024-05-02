import Redis from "ioredis";

export const Redisclient = new Redis(process.env.REDIS_CLIENT_ID as string);
