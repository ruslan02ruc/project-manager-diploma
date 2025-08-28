import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'

import { ChatService } from './chat.service'
import { ChatDto, SendMessageDto } from './dto/chat.dto'

@Controller('chats')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	// GET /chats — получить список чатов пользователя
	@Get('')
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.chatService.getAll(userId)
	}

	// GET /chats/:id — получить конкретный чат (сообщения, участников)
	@Get(':id')
	@Auth()
	async getById(
		@Param('id') chatId: string,
		@CurrentUser('id') userId: string
	) {
		return this.chatService.getById(chatId, userId)
	}

	// POST /chats/private — создать приватный чат с другим пользователем
	@Post('private/:id')
	@HttpCode(200)
	@Auth()
	async createPrivateChat(
		@CurrentUser('id') userId: string,
		@Param('id') targetUserId: string
	) {
		return this.chatService.createPrivateChat(userId, targetUserId)
	}

	// POST /chats/group — создать групповой чат (опционально привязать к projectId)
	@UsePipes(new ValidationPipe())
	@Post('group')
	@HttpCode(200)
	@Auth()
	async createGroupChat(
		@CurrentUser('id') userId: string,
		@Body() dto: ChatDto
	) {
		return this.chatService.createGroupChat(userId, dto)
	}

	// POST /chats/:id/members — добавить участника в чат
	@Post(':id/members')
	@HttpCode(200)
	@Auth()
	async addMember(
		@Param('id') chatId: string,
		@CurrentUser('id') userId: string
	) {
		return this.chatService.addMember(chatId, userId)
	}

	// DELETE /chats/:id/members/:userId — удалить участника
	@Delete(':id')
	@Auth()
	async removeMember(
		@Param('id') chatId: string,
		@CurrentUser('id') userId: string
	) {
		return this.chatService.removeMember(chatId, userId)
	}

	@Get(':chatId/messages')
	@HttpCode(200)
	@Auth()
	getMessages(
		@Param('chatId') chatId: string,
		@CurrentUser('id') userId: string
	) {
		return this.chatService.getMessages(chatId, userId)
	}

	@Post(':chatId/messages')
	@HttpCode(200)
	@Auth()
	sendMessage(
		@Param('chatId') chatId: string,
		@Body() dto: SendMessageDto,
		@CurrentUser('id') userId: string
	) {
		return this.chatService.sendMessage(chatId, userId, dto.content)
	}
}
