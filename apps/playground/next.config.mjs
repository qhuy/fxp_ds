/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile les packages workspace (pas de tsup intermédiaire pour le DX dev)
  transpilePackages: ['@qhuy/react', '@qhuy/tokens'],
}

export default nextConfig
