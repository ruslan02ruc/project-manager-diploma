import { Injectable, Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class WebsocketService {
	constructor(private prisma: PrismaService) {}

	private server: Server
	private logger: Logger = new Logger('WebsocketService')

	setServer(server: Server) {
		this.server = server
	}

	handleMessage(message: any, client: Socket) {
		return { event: 'message', data: message }
	}

	// handleMessage(dto: string, client: Socket) {
	// 	try {
	// 		const message = typeof dto === 'string' ? dto : JSON.stringify(dto)
	// 		this.logger.debug(`Broadcasting message: ${message}`)
	// 		this.server.emit('message', {
	// 			id: client.id,
	// 			// userId: user.id,
	// 			// userEmail: user.email,
	// 			message
	// 		})
	// 		return { success: true }
	// 	} catch (error) {
	// 		this.logger.error(`Error handling message: ${error.message}`)
	// 		return { success: false, error: error.message }
	// 	}
	// }

	// Send project events
	sendToProject(projectId: string, event: string, data: any) {
		if (this.server) {
			this.server.to(`project:${projectId}`).emit(event, data)
		}
	}

	// Examples of specific project events
	notifyProjectTaskCreated(projectId: string, taskData: any) {
		this.sendToProject(projectId, 'task:created', taskData)
	}

	notifyProjectTaskUpdated(projectId: string, taskData: any) {
		this.sendToProject(projectId, 'task:updated', taskData)
	}

	notifyProjectCommentAdded(projectId: string, commentData: any) {
		this.sendToProject(projectId, 'comment:added', commentData)
	}

	notifyProjectMemberAdded(projectId: string, memberData: any) {
		this.sendToProject(projectId, 'member:added', memberData)
	}
}
