/** @type {import('next').NextConfig} */
const nextConfig = {
	strictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "carmanagys-medalidridi-koyotechnolo.vercel.app",
			},
			{
				protocol: "https",
				hostname: "api.qrserver.com",
			  },
		],
	},
};

module.exports = nextConfig;