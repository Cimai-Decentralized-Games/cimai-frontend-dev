import type { NextConfig } from "next";
import path from 'path';

// Simplify configuration based on the working app
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Configure allowed origins to fix CORS issues
  experimental: {
    allowedDevOrigins: ['localhost', 'cimai.biz', '198.54.125.197'],
  },
  // Update images config to be more flexible
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Simplify webpack config to avoid resource issues
  webpack: (config, { isServer }) => {
    // Add externals to avoid resource-heavy packages
    config.externals = config.externals || [];
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Add webpack-runtime alias - this helps with cPanel environments
    try {
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias['webpack-runtime'] = path.join(
        process.cwd(), 
        '.next', 
        'static', 
        'chunks', 
        'webpack-runtime.js'
      );
    } catch (err) {
      console.warn('Could not set webpack-runtime alias:', err);
    }
    
    return config;
  },
  // No other options that might trigger Turbopack
};

export default nextConfig;
