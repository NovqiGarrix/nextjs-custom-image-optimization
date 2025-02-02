import { Redis } from 'ioredis';

// Create Redis client
const redis = new Redis(process.env.REDIS_URL!);

// Handle Redis connection errors
redis.on('error', (error) => {
    console.error('Redis connection error:', error);
});

export async function getCachedImage(key: string): Promise<Buffer | null> {
    try {
        const data = await redis.getBuffer(key);
        return data;
    } catch (error) {
        console.error('Failed to get cached image from Redis:', error);
        throw error;
    }
}

export async function cacheImage(key: string, buffer: Buffer): Promise<void> {
    try {
        // Store the buffer in Redis with a 24-hour expiration
        // to prevent unnecessary storage
        await redis.set(key, buffer, 'EX', 24 * 60 * 60);
    } catch (error) {
        throw error;
    }
}