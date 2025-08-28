import { Injectable, NotFoundException } from '@nestjs/common'
import { PusherService } from 'src/pusher/pusher.service'

import { PrismaService } from '../prisma.service'

import { UpdateCommentDto } from './dto/update-comment.dto'
import { returnCommentObject } from './return-comment.object'

@Injectable()
export class CommentService {
	constructor(
		private prisma: PrismaService,
		private pusherService: PusherService
	) {}

	async getTask(id: string) {
		const comments = await this.prisma.comment.findMany({
			where: {
				taskId: id
			},
			select: returnCommentObject
		})

		return comments
	}

	async getById(id: string) {
		const comment = await this.prisma.comment.findMany({
			where: {
				taskId: id
			},
			select: returnCommentObject
		})
		if (!comment) throw new NotFoundException('Комментарий не найден')

		return comment
	}

	async create(userId: string, taskId: string, dto: UpdateCommentDto) {
		// 1. Создаём комментарий
		const comment = await this.prisma.comment.create({
			data: {
				message: dto.message,
				task: {
					connect: {
						id: taskId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			},
			include: {
				user: true
			}
		})

		// 2. Получаем projectId задачи
		const task = await this.prisma.task.findUnique({
			where: { id: taskId },
			select: { projectId: true }
		})
		if (!task) throw new NotFoundException('Задача не найдена')

		// 3. Получаем участников проекта
		const members = await this.prisma.projectMember.findMany({
			where: {
				projectId: task.projectId
			},
			select: {
				userId: true
			}
		})

		// 4. Отправляем событие каждому участнику по личному каналу
		for (const member of members) {
			await this.pusherService.trigger(
				`user-${member.userId}`,
				'comment_data',
				comment
			)
		}

		// await this.pusherService.trigger('comment', 'comment_data', comment)

		return comment
	}

	async replyToComment(commentId: string, dto: UpdateCommentDto) {
		const parentComment = await this.prisma.comment.findUnique({
			where: {
				id: commentId
			}
		})
		if (!parentComment) throw new NotFoundException('Комментарий не найден')

		const comment = await this.prisma.comment.create({
			data: {
				message: dto.message,
				task: {
					connect: {
						id: parentComment.taskId
					}
				},
				user: {
					connect: {
						id: parentComment.userId
					}
				},
				parent: {
					connect: {
						id: commentId
					}
				}
			},
			include: {
				user: true
			}
		})

		// 2. Получаем projectId задачи
		const task = await this.prisma.task.findUnique({
			where: { id: parentComment.taskId },
			select: { projectId: true }
		})
		if (!task) throw new NotFoundException('Задача не найдена')

		// 3. Получаем участников проекта
		const members = await this.prisma.projectMember.findMany({
			where: {
				projectId: task.projectId
			},
			select: {
				userId: true
			}
		})

		// 4. Отправляем событие каждому участнику по личному каналу
		for (const member of members) {
			await this.pusherService.trigger(
				`private-user-${member.userId}`,
				'comment_data',
				comment
			)
		}

		return comment
	}

	async update(id: string, dto: UpdateCommentDto) {
		const oldComment = await this.prisma.comment.findUnique({
			where: { id },
			select: { id: true }
		})
		if (!oldComment) throw new NotFoundException('Комментарий не найден')

		const updatedComment = await this.prisma.comment.update({
			where: { id },
			data: {
				message: dto.message
			}
		})

		// 2. Получаем projectId задачи
		const task = await this.prisma.task.findUnique({
			where: { id },
			select: { projectId: true }
		})
		if (!task) throw new NotFoundException('Задача не найдена')

		// 3. Получаем участников проекта
		const members = await this.prisma.projectMember.findMany({
			where: {
				projectId: task.projectId
			},
			select: {
				userId: true
			}
		})

		// 4. Отправляем событие каждому участнику по личному каналу
		for (const member of members) {
			await this.pusherService.trigger(
				`private-user-${member.userId}`,
				'comment_data',
				updatedComment
			)
		}

		// await this.pusherService.trigger(
		// 	'comment',
		// 	'comment_data',
		// 	updatedComment
		// )

		return updatedComment
	}

	async delete(id: string) {
		const comment = await this.prisma.comment.delete({
			where: {
				id
			}
		})

		await this.pusherService.trigger('comment', 'comment_data', comment)

		return comment
	}
}
