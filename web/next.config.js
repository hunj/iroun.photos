/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
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
}

module.exports = nextConfig
