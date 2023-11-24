/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    generateBuildId: async () => {
        return "deez_nuts"
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: process.env.NGINX_URL,
                port: process.env.NGINX_PORT,
                pathname: '/uploads/**',
            },
        ],
    },
    output: 'standalone',
}

module.exports = nextConfig
