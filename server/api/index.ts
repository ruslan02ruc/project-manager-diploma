import { NestFactory } from '@nestjs/core'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { AppModule } from '../src/app.module'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const app = await NestFactory.create(AppModule)
	await app.init()

	const handler = app.getHttpAdapter().getInstance()
	handler(req, res)
}
