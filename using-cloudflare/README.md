# Using Cloudflare Images

## Introduction
This example demonstrates how to use Cloudflare Images for image optimization in Next.js applications. Cloudflare Images provides a powerful and efficient way to transform, optimize, and deliver images through Cloudflare's global network.

## Prerequisites
1. Create a Cloudflare account
   - Go to [Cloudflare's website](https://dash.cloudflare.com/sign-up)
   - Sign up for a new account if you don't have one
   - Verify your email address

2. Enable Cloudflare Images
   - Log in to your [Cloudflare dashboard](https://dash.cloudflare.com)
   - Click on "Images" in the left sidebar
   - If you haven't used Images before, you'll need to enable it (read *Understanding Cloudflare Zones*)
   - Note: Cloudflare Images is a paid service, but it comes with a free tier that can serve up to 5.000 unique transformations every month at no added cost

3. Get your Cloudflare credentials
   - In your Cloudflare dashboard, go to "Account Home"
   - Find your Account ID at the top right of the page
   - Go to "API Tokens" under "My Profile"
   - Create a new API token with the following permissions:
     - Cloudflare Images: Edit (Read and Write) - Required for uploading and managing images
   - Save both your Account ID and API token securely

## Important Note About Domains
Before proceeding, ensure that:
- Your domain is properly configured as a Cloudflare Zone
- The domain you use for image transformations matches your Cloudflare Zone
- Images will only be served through domains that are part of your configured Zone

For example, if your Zone is `example.com`, you can only serve images through:
- example.com
- images.example.com
- any other subdomain of example.com

Attempting to serve images through a domain that's not part of your Zone will result in errors.

## Project Setup
1. Clone and install dependencies
```bash
pnpm install
```

2. Run the development server
```bash
pnpm dev
```

## How it Works
This implementation uses Cloudflare Images to:
- Store uploaded images securely
- Transform images on-the-fly (resize, format conversion, etc.)
- Deliver images through Cloudflare's global CDN

The image transformations are handled through Cloudflare's API, which provides:
- Automatic WebP/AVIF format conversion
- Responsive image sizing
- Image optimization
- Global edge caching

## Understanding Cloudflare Zones
A Zone in Cloudflare represents a domain name and its subdomains. When you add a domain to Cloudflare, it becomes a Zone that you can manage. Each Zone includes:
- DNS management
- SSL/TLS settings
- Caching rules
- Security settings
- Image transformation rules

For example, if you own `example.com`:
- The entire `example.com` domain is a Zone
- All subdomains (like `images.example.com`, `api.example.com`) are part of the same Zone
- Each Zone has its own settings and configurations
- You can apply different image transformation rules within a Zone

### Setting up a Zone
1. Add your domain to Cloudflare
2. Update your domain's nameservers to Cloudflare's nameservers
3. Wait for DNS propagation (usually takes 24-48 hours)
4. Once active, you can configure image transformations for your Zone

## Additional Resources
- [Cloudflare Images Documentation](https://developers.cloudflare.com/images/)
- [Cloudflare Images Pricing](https://www.cloudflare.com/products/cloudflare-images/)
- [Image Transformation Parameters](https://developers.cloudflare.com/images/image-resizing/)

## Deployment
### Deploying with Cloudflare Pages (Recommended)
1. Install Wrangler CLI
```bash
npm install -g wrangler
```

2. Login to your Cloudflare account
```bash
wrangler login
```

3. Configure your project
- Go to Cloudflare Pages in your dashboard
- Click "Create a project"
- Connect your GitHub repository
    - Configure build settings:
    - Framework preset: Next.js
    - Build command: npm run build
    - Build output directory: .next

4. Set up environment variables
- In your Cloudflare Pages project settings
- Add the following environment variables:
```env
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

5. Deploy manually (optional)
```bash
wrangler pages deploy .
```
Your application will now be deployed and automatically receive updates when you push to your repository. The image transformations will work automatically since you're deploying directly to Cloudflare's network.