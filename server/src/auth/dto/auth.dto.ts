import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@ApiProperty({
		description: 'Имя пользователя',
		example: 'Иван',
		required: false
	})
	@IsOptional()
	@IsString()
	name: string

	@ApiProperty({
		description: 'Почта пользователя',
		example: 'ivan@example.com',
		required: true
	})
	@IsString()
	@IsEmail()
	email: string

	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'QWERTY123',
		required: true
	})
	@MinLength(6, {
		message: 'Пароль должен содержать не менее 6 символов'
	})
	@IsString()
	password: string
}
