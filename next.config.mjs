/** @type {import('next').NextConfig} */
// import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
    images: {
        // Define the maximum file size for images to be optimized and cached
        deviceSizes: [320, 420, 768, 1024, 1200, 1800, 1920],
        imageSizes: [16, 32, 48, 64, 128, 256, 384, 512],
        // domains: ['example.com'], // Add allowed domains for external images
        loader: 'default', // Can be set to 'imgix', 'cloudinary', etc. if using those services
        minimumCacheTTL: 60, // Minimum time to cache images (in seconds)
        formats: ['image/avif', 'image/webp'], // Image formats to use
        // maxImageFileSize: 10 * 1024 * 1024, // 10MB (adjust as needed),
        remotePatterns: [
            {
                hostname: "contentful.com",
                protocol: "https",
            },
            {
                hostname: "localhost",
                protocol: "http",
            },
        ]
    },
    
};

// const withPWA = withPWAInit({
//     dest: "public",
//     register: true
// });

// const config = withPWA({
//     ...nextConfig
// });

export default nextConfig;




