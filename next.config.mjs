/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '192.168.56.1',   // VirtualBox Host-Only
    '192.168.0.*',    // common home router subnet
    '192.168.1.*',    // common home router subnet
    '192.168.100.*',  // common hotspot subnet
    '10.0.0.*',       // corporate / hotspot
    '10.0.1.*',
    '172.20.*.*',     // Docker / other virtual networks
    '192.168.3.121',
  ],
}

export default nextConfig
