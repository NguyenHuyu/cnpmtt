/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/daa/:path*',
        destination: 'http://14.224.168.239:8001/api/:path*'
      }
    ]
  },

  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true
  },
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://seplabeo.com'
        : 'http://localhost:3000',
    NEXTAUTH_SECRET: '2342234234dfd'
  }
}

module.exports = nextConfig

