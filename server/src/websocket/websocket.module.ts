import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

import { getJwtConfig } from '../config/jwt.config'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'

import { WebsocketGateway } from './websocket.gateway'
import { WebsocketService } from './websocket.service'

@Module({
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	providers: [WebsocketGateway, WebsocketService, UserService, PrismaService],
	exports: [WebsocketService]
})
export class WebsocketModule {}
