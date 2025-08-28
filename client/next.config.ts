import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL,
		NEXT_PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
		NEXT_PUSHER_CLUSTER: process.env.PUSHER_CLUSTER
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig
