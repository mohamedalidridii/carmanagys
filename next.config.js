// /** @type {import('next').NextConfig} */
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

module.exports = withPayload(
	{
		webpack5: false,
			// StrictMode: true,
			images: {
				domains: ['www.192.168.1.18:3000'],
				remotePatterns: [
					{
						protocol: "http",
						hostname: "localhost",
					},
					{
						protocol: "http",
						hostname: "192.168.1.18",
					},
					{
						protocol: "https",
						hostname: "car-managys.com",
					},
					{
						protocol: "https",
						hostname: "api.qrserver.com",
					  },
				],

		},
	},
	{
	  // The second argument to `withPayload`
	  // allows you to specify paths to your Payload dependencies
	  // and configure the admin route to your Payload CMS.
  
	  // Point to your Payload config (required)
	  configPath: path.resolve(__dirname, "./dist/payload.config.js"),
  
	  // Point to custom Payload CSS (optional)
	//   cssPath: path.resolve(__dirname, "./css/my-custom-payload-styles.css"),
  
	  // Point to your exported, initialized Payload instance (optional, default shown below`)
	//   payloadPath: path.resolve(process.cwd(), "./payload/payloadClient.ts"),
  
	  // Set a custom Payload admin route (optional, default is `/admin`)
	  // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
	  adminRoute: "/sell",
	}
  );

