import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenTdo } from './dto/refresh-token.tdo'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно зарегистрирован'
	})
	@ApiBody({
		description: 'Данные для регистрации',
		type: AuthDto
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно авторизован'
	})
	@ApiBody({
		description: 'Данные для авторизован',
		type: AuthDto
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@ApiResponse({
		status: 200
	})
	@ApiBody({
		type: RefreshTokenTdo
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenTdo) {
		return this.authService.getNewTokens(dto.refreshToken)
	}
}
