// next.config.js
const nextConfig = {
    reactStrictMode: true, // Optional: Enables strict mode for React
    env: {
        // You can add your environment variables here
        PORT: process.env.PORT || 3000,
    },
};

module.exports = nextConfig;
