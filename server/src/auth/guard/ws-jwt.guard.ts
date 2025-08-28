// src/auth/guard/ws-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { UserService } from '../../user/user.service'

@Injectable()
export class WsJwtGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const client: Socket = context.switchToWs().getClient()
			const token = this.extractTokenFromHeader(client)

			if (!token) {
				throw new WsException('Unauthorized access')
			}

			const payload = await this.jwtService.verify(token, {
				secret: this.configService.get('JWT_SECRET')
			})

			const user = await this.userService.getById(payload.id)
			client['user'] = user

			return true
		} catch (error) {
			throw new WsException('Unauthorized access')
		}
	}

	private extractTokenFromHeader(client: Socket): string | undefined {
		const authorization =
			client.handshake?.headers?.authorization ||
			client.handshake?.auth?.token

		if (!authorization) {
			return undefined
		}

		const [type, token] = authorization.split(' ')
		return type === 'Bearer' ? token : undefined
	}
}
