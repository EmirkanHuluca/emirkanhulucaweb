/** @type {import('next').NextConfig} */
const nextConfig = {
compiler: { styledComponents: true },
images: {
remotePatterns: [
// Allow images from your blob storage or CDNs
{ protocol: "https", hostname: "blob.vercel-storage.com" },
{ protocol: "https", hostname: "res.cloudinary.com" },
],
},
};
module.exports = nextConfig;