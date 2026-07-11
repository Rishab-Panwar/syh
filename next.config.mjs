/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a self-contained server bundle for a small Docker image.
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
