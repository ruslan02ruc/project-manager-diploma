import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshTokenTdo {
	@ApiProperty({
		description: 'refresh пользователя',
		required: true
	})
	@IsString({
		message: 'Вы не передали refresh токен или это не строка!'
	})
	refreshToken: string
}
