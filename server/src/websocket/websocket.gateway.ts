import { Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { WsAuth } from 'src/auth/decorators/ws-auth.decorator'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

import { WebsocketService } from './websocket.service'

@WebSocketGateway({
	cors: {
		origin: '*'
	},
	namespace: 'api'
})
export class WebsocketGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private logger: Logger = new Logger('WebsocketGateway')

	@WebSocketServer() server: Server

	constructor(
		private readonly websocketService: WebsocketService,
		private jwtService: JwtService,
		private configService: ConfigService,
		private userService: UserService,
		private prisma: PrismaService
	) {}

	afterInit(server: Server) {
		this.logger.log('WebSocket Gateway Initialized')
		this.websocketService.setServer(server)
	}

	async handleConnection(client: Socket) {
		try {
			const token = this.extractTokenFromHeader(client)

			if (!token) {
				this.logger.error(`Unauthorized connection attempt: ${client.id}`)
				client.disconnect()
				return
			}

			const payload = await this.jwtService.verify(token, {
				secret: this.configService.get('JWT_SECRET')
			})

			const user = await this.userService.getById(payload.id)
			client['user'] = user

			this.logger.log(`Client connected: ${client.id}, User: ${user.email}`)
		} catch (error) {
			this.logger.error(`Authentication error: ${error.message}`)
			client.disconnect()
		}
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`)
	}

	@SubscribeMessage('joinProject')
	@WsAuth()
	async handleJoinProject(
		@MessageBody() projectId: string,
		@ConnectedSocket() client: Socket
	) {
		try {
			const user = client['user']

			const project = await this.prisma.project.findUnique({
				where: { id: projectId }
			})
			if (project?.ownerId === user.id) {
				client.join(`project:${projectId}`)
				this.logger.log(`User joined project as owner: ${projectId}`)
				client.emit('projectJoined', { projectId, role: 'owner' })
				return { success: true, message: 'Joined project room as owner' }
			}

			// Check if user is project member
			const projectMember = await this.prisma.projectMember.findUnique({
				where: {
					projectId_userId: {
						projectId: projectId,
						userId: user.id
					}
				}
			})

			if (!projectMember) {
				throw new UnauthorizedException(
					'You are not a member of this project'
				)
			}

			// Join the project room
			client.join(`project:${projectId}`)

			return { success: true, message: 'Joined project room' }
		} catch (error) {
			this.logger.error(`Failed to join project: ${error.message}`)
			return { success: false, message: error.message }
		}
	}

	@SubscribeMessage('leaveProject')
	@WsAuth()
	handleLeaveProject(
		@MessageBody() projectId: string,
		@ConnectedSocket() client: Socket
	) {
		client.leave(`project:${projectId}`)
		return { success: true, message: 'Left project room' }
	}

	@SubscribeMessage('message')
	@WsAuth()
	handleMessage(
		@MessageBody() dto: string,
		@ConnectedSocket() client: Socket
	) {
		const user = client['user']
		this.logger.log(`Message from ${user.email}: ${JSON.stringify(dto)}`)
		return this.websocketService.handleMessage(dto, client)
	}

	async sendProjectUpdate(projectId: string, eventType: string, data: any) {
		this.server.to(`project:${projectId}`).emit(eventType, data)
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
