import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

import { Auth } from '../auth/decorators/auth.decorator'

import { CurrentUser } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiResponse({
		status: 200,
		description: 'Профиль пользователя успешно получен',
		schema: {
			example: { id: '1', name: 'Иван', email: 'ivan@example.com' }
		}
	})
	@ApiResponse({ status: 401, description: 'Неавторизованный запрос' })
	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@ApiResponse({
		status: 200,
		description: 'Список пользователей успешно получен',
		schema: {
			example: [
				{ id: '1', name: 'Иван', email: 'ivan@example.com' },
				{ id: '2', name: 'Вадим', email: 'vadim@example.com' }
			]
		}
	})
	@ApiResponse({ status: 400, description: 'Некорректный параметр поиска' })
	@Get()
	@Auth()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно получен',
		schema: {
			example: { id: '1', name: 'Иван', email: 'ivan@example.com' }
		}
	})
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@Get('by-id/:id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно обновлен',
		schema: {
			example: {
				id: '1',
				name: 'Ivan Updated',
				email: 'ivan_updated@example.com'
			}
		}
	})
	@ApiResponse({
		status: 400,
		description: 'Некорректные данные для обновления'
	})
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@ApiBody({
		description: 'Данные для обновления пользователя',
		type: UpdateUserDto,
		examples: {
			example1: {
				summary: 'Обновление имени',
				value: { name: 'Ivan Updated' }
			}
		}
	})
	@UsePipes(new ValidationPipe())
	@Put()
	@HttpCode(200)
	@Auth()
	async update(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.userService.update(id, dto)

		if (!updatedUser) throw new NotFoundException('Пользователь не найден')
		return updatedUser
	}

	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно удален',
		schema: {
			example: { message: 'Пользователь удален' }
		}
	})
	@ApiResponse({ status: 403, description: 'Доступ запрещен' })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@Delete()
	@Auth('admin')
	async delete(@CurrentUser('id') id: string) {
		const deletedUser = await this.userService.delete(id)

		if (!deletedUser) throw new NotFoundException('Пользователь не найден')
		return deletedUser
	}
}
