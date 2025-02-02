import sharp from 'sharp';
import { createHash } from 'crypto';
import { type NextRequest } from 'next/server'
import { ensureCacheDir, getCachedImage, cacheImage } from './imageCache';

const CACHE_CONTROL = {
    public: 'public',
    maxAge: 'max-age=31536000',
    immutable: 'immutable',
}

export async function GET(request: NextRequest) {

    const { searchParams } = request.nextUrl;

    try {

        // These variables are provided by Next.js Image loader
        // check components/optimized-image.tsx
        const q = searchParams.get("q");
        const w = searchParams.get("w");
        const url = searchParams.get("url");

        if (!q || !w || !url) {
            return new Response("Missing q, w, and url from query params", { status: 400 });
        }

        // Create cache key from URL and parameters
        const hash = createHash('sha256')
            .update(`${url}-${w}-${q}`)
            .digest('hex');

        // Ensure cache directory exists
        await ensureCacheDir();

        // Try to get image from cache
        const cachedImage = await getCachedImage(hash);

        // if image is in cache, return it
        if (cachedImage) {
            const res = new Response(cachedImage, {
                headers: {
                    'Content-Type': 'image/webp',
                    'Cache-Control': Object.values(CACHE_CONTROL).join(', '),
                    'X-Cache': 'HIT',
                }
            });
            return res;
        }

        // Fetch and optimize image
        const imageResponse = await fetch(url as string);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const optimizedImage = await sharp(buffer)
            .resize(Number(w) || null)
            .webp({ quality: Number(q) || 80 })
            .toBuffer();

        // Save to cache
        await cacheImage(hash, optimizedImage);
        const res = new Response(optimizedImage, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': Object.values(CACHE_CONTROL).join(', '),
                'X-Cache': 'MISS',
            }
        });

        return res;
    } catch (error) {
        console.error('Image optimization error:', error);
        return new Response("Internal Server Error", { status: 500 });
    }

}