import fs from 'fs/promises';
import path from 'path';

// Define the cache directory
const CACHE_DIR = path.join(process.cwd(), 'public', 'image-cache');

export async function ensureCacheDir() {
    try {
        await fs.access(CACHE_DIR);
    } catch {
        await fs.mkdir(CACHE_DIR, { recursive: true });
    }
}

export async function getCachedImage(key: string): Promise<Buffer | null> {
    try {
        const filePath = path.join(CACHE_DIR, key);
        const buffer = await fs.readFile(filePath);
        return buffer;
    } catch {
        return null;
    }
}

export async function cacheImage(key: string, buffer: Buffer): Promise<void> {
    try {
        const filePath = path.join(CACHE_DIR, key);
        await fs.writeFile(filePath, buffer as unknown as Uint8Array);
    } catch (error) {
        console.error('Failed to cache image:', error);
    }
}