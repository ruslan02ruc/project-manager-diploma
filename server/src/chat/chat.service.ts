import {
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PusherService } from 'src/pusher/pusher.service'

import { ChatDto } from './dto/chat.dto'

@Injectable()
export class ChatService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly pusherService: PusherService
	) {}

	async getAll(userId: string) {
		const chats = await this.prisma.chat.findMany({
			where: {
				members: {
					some: {
						userId
					}
				}
			},
			include: {
				members: {
					include: {
						user: true
					}
				},
				messages: {
					orderBy: { createdAt: 'desc' },
					take: 1
				}
			}
		})

		return chats.map(chat => {
			const otherMember = chat.members.find(m => m.userId !== userId)
			return {
				...chat,
				members: otherMember,
				chatName: chat.isGroup ? chat.title : otherMember?.user.name,
				chatAvatar: chat.isGroup ? null : otherMember?.user.avatar,
				otherUser: chat.isGroup ? null : otherMember?.user
			}
		})
	}

	async getById(chatId: string, userId: string) {
		const chat = await this.prisma.chat.findUnique({
			where: { id: chatId },
			include: {
				members: true,
				messages: true
			}
		})

		if (!chat) throw new NotFoundException('Chat not found')
		const isMember = chat.members.some(m => m.userId === userId)
		if (!isMember) throw new ForbiddenException('Access denied')

		return chat
	}

	async createPrivateChat(userId: string, targetUserId: string) {
		const existing = await this.prisma.chat.findFirst({
			where: {
				isGroup: false,
				members: {
					every: {
						userId: { in: [userId, targetUserId] }
					}
				}
			}
		})

		if (existing) return existing

		return this.prisma.chat.create({
			data: {
				isGroup: false,
				members: {
					create: [{ userId }, { userId: targetUserId }]
				}
			}
		})
	}

	async createGroupChat(ownerId: string, dto: ChatDto) {
		const members = [...new Set([ownerId, ...dto.memberIds])]

		return this.prisma.chat.create({
			data: {
				isGroup: true,
				title: dto.title,
				projectId: dto.projectId,
				members: {
					create: members.map(userId => ({ userId }))
				}
			},
			include: {
				members: true
			}
		})
	}

	async addMember(chatId: string, userId: string) {
		const chat = await this.prisma.chat.findUnique({ where: { id: chatId } })
		if (!chat) throw new NotFoundException('Chat not found')
		return this.prisma.chatMember.create({
			data: {
				chatId,
				userId
			}
		})
	}

	async removeMember(chatId: string, userId: string) {
		return this.prisma.chatMember.delete({
			where: {
				chatId_userId: {
					chatId,
					userId
				}
			}
		})
	}

	async getMessages(chatId: string, userId: string) {
		const chat = await this.prisma.chat.findUnique({
			where: { id: chatId },
			include: { members: true }
		})

		if (!chat) throw new NotFoundException('Chat not found')

		const isMember = chat.members.some(m => m.userId === userId)
		if (!isMember) throw new ForbiddenException('Access denied')

		for (const member of chat.members) {
			console.log(member.userId)

			await this.pusherService.trigger(
				`user-${member.userId}`,
				'chat_data',
				chat
			)
		}

		return this.prisma.message.findMany({
			where: { chatId },
			orderBy: { createdAt: 'asc' },
			include: { sender: true }
		})
	}

	async sendMessage(chatId: string, userId: string, content: string) {
		const isMember = await this.prisma.chatMember.findUnique({
			where: {
				chatId_userId: {
					chatId,
					userId
				}
			}
		})

		if (!isMember) throw new ForbiddenException('Not a chat member')

		const chat = await this.prisma.chat.findUnique({
			where: { id: chatId },
			include: { members: true }
		})

		for (const member of chat.members) {
			console.log(member.userId)

			await this.pusherService.trigger(
				`user-${member.userId}`,
				'chat_data',
				chat
			)
		}

		return this.prisma.message.create({
			data: {
				content,
				chatId,
				senderId: userId
			},
			include: {
				sender: true
			}
		})
	}
}
