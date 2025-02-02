# Next.js Custom Image Optimization

This repository demonstrates two different approaches for implementing custom image optimization in Next.js 14 and later versions. Both implementations utilize Sharp, a high-performance Node.js image processing library, to handle image transformations. This approach is particularly useful when you want to avoid Vercel's image optimization service limitations (such as monthly optimization quotas) or need more control over your image optimization pipeline.

## Projects Overview

### 1. File System Based Optimization (you can't use this on Vercel)
The first project showcases image optimization using the local file system. This approach:
- Stores optimized images directly on the server's file system
- Great for smaller applications or when cloud storage isn't needed
- Provides fast access to cached images

### 2. Redis Based Optimization
The second project implements image optimization using Redis as a caching layer. This approach:
- Stores optimized images in Redis for quick retrieval

### 3. Cloudflare Images Based Optimization
The third project demonstrates image optimization using Cloudflare Images. This approach:
- Leverages Cloudflare's global CDN network for image delivery
- Provides automatic image optimization and format conversion
- Offers robust image transformation capabilities
- Includes built-in security features and DDoS protection

## Technical Stack
- Next.js 14+
- Sharp (for image processing)
- Redis (for the Redis-based implementation). You can use upstash (I'm not sponsored by them)
- Cloudflare Images (for the Cloudflare-based implementation)
- TypeScript

## Getting Started

Each project has its own setup instructions in their respective directories:
- `/using-filesystem`
- `/using-redis`
- `/using-cloudflare`

Please refer to the README in each directory for specific setup and running instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License