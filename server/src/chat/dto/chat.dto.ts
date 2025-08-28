import { IsArray, IsOptional, IsString } from 'class-validator'

export class ChatDto {
	@IsString()
	title: string

	@IsArray()
	memberIds: string[]

	@IsString()
	@IsOptional()
	projectId?: string
}

export class SendMessageDto {
	@IsString()
	content: string
}
