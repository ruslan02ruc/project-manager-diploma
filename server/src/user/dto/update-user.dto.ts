import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
	@ApiProperty({
		description: 'Имя пользователя',
		example: 'Иван',
		required: true
	})
	@IsString()
	name: string

	@ApiProperty({
		description: 'Почта пользователя',
		example: 'email@gmail.com',
		required: true
	})
	@IsEmail()
	email: string

	@ApiProperty({
		description: 'Картинка пользователя',
		example: 'url-to-avatar',
		required: false
	})
	@IsString()
	@IsOptional()
	avatar: string
}
