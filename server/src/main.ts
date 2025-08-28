import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: false })

	const config = new DocumentBuilder()
		.setTitle('Документация')
		.setVersion('1.0')
		.build()
	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, documentFactory)

	app.setGlobalPrefix('api')
	app.enableCors()

	await app.listen(4200)

	// const session = await new SessionBuilder().authtokenFromEnv().connect()
	// const listener = await session.httpEndpoint().listen()
	// new Logger('main').log(`Ingress established at ${listener.url()}`)
	// listener.forward(`localhost:${4200}`)
}
bootstrap()
