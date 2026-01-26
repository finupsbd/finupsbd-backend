// src/lib/redisClient.ts
import { createClient, RedisClientType } from 'redis';

 const client: RedisClientType = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,               // ← move creds into env!
  socket: {
    host: process.env.REDIS_HOST,                     // ← e.g. redis-12708.crce194…
    port: Number(process.env.REDIS_PORT),             // ← e.g. 12708
  },
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Connect once, at app startup
export async function initRedis(): Promise<void> {
  if (!client.isOpen) {
    await client.connect();
    console.log('🔗 Connected to Redis');
  }
}

export default client;
