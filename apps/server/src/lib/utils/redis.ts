import Redis from 'ioredis';

export function createClient() {
  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST as unknown as string,
      port: process.env.REDIS_PORT as unknown as number,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Failed to connect after ${times} attempts.`);
        }
        return Math.min(times * 200, 1000);
      },
    });

    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error', error);
    });
    return redis;
  } catch (e) {
    throw new Error(`[Redis] Failed to connect`);
  }
}
