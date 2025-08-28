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
import { Auth } from 'src/auth/decorators/auth.decorator'

import { CurrentUser } from '../user/decorators/user.decorator'

import { ProjectMemberDto } from './dto/project-member.dto'
import { ProjectMemberService } from './project-member.service'

@Controller('project-members')
export class ProjectMemberController {
	constructor(private readonly projectMemberService: ProjectMemberService) {}

	@Get(':id')
	async getAll(
		@Param('id') projectId: string,
		@Query('searchTerm') searchTerm?: string
	) {
		return this.projectMemberService.getAll(projectId, searchTerm)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.projectMemberService.getById(id)
	}

	@Post(':id')
	@HttpCode(200)
	@Auth()
	async create(@Param('id') projectId: string, @Body() dto: ProjectMemberDto) {
		return this.projectMemberService.create(projectId, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth()
	async update(@Param('id') id: string, @Body() dto: ProjectMemberDto) {
		const updatedProject = await this.projectMemberService.update(id, dto)

		if (!updatedProject) throw new NotFoundException('Запись не найдена')
		return updatedProject
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		const deletedProject = await this.projectMemberService.delete(id, userId)

		if (!deletedProject) throw new NotFoundException('Запись не найдена')
		return deletedProject
	}
}
