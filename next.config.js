/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "http",
				hostname: "car-managys.com",
			},
			{
				protocol: "https",
				hostname: "api.qrserver.com",
			  },
		],
	},
};

module.exports = nextConfig;