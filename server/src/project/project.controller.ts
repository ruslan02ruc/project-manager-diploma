import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'

import { ProjectDto } from './dto/project.dto'
import { GetProjectQueryDto } from './dto/project.query'
import { ProjectService } from './project.service'

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get('')
	@Auth()
	async getAllQuery(
		@CurrentUser('id') userId: string,
		@Query(new ValidationPipe({ transform: true })) query: GetProjectQueryDto
	) {
		return this.projectService.getAllQuery(userId, query)
	}

	@Get('stranger')
	@Auth()
	async getAllStranger(
		@CurrentUser('id') userId: string,
		@Query(new ValidationPipe({ transform: true })) query: GetProjectQueryDto
	) {
		return this.projectService.getAllStranger(userId, query)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth()
	async create(@CurrentUser('id') userId: string, @Body() dto: ProjectDto) {
		return this.projectService.create(userId, dto)
	}

	@Get('by-id/:id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.projectService.getById(id)
	}

	@Get('stranger/:id')
	@Auth()
	async getByStranger(
		@Param('id') id: string,
		@CurrentUser('id') userId: string
	) {
		return this.projectService.getByStrangerId(id, userId)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth()
	async update(@Param('id') id: string, @Body() dto: ProjectDto) {
		const updatedProject = await this.projectService.update(id, dto)

		if (!updatedProject) throw new NotFoundException('Проект не найден')
		return updatedProject
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		const deletedProject = await this.projectService.delete(id)

		if (!deletedProject) throw new NotFoundException('Проект не найден')
		return deletedProject
	}
}
