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
                hostname: 'nginx',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
    output: 'standalone',
}

module.exports = nextConfig
