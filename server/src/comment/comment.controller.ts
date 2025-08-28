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
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guard/jwt.guard'
import { CurrentUser } from '../user/decorators/user.decorator'

import { CommentService } from './comment.service'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.commentService.getById(id)
	}

	@Post(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async create(
		@CurrentUser('id') userId: string,
		@Body() dto: UpdateCommentDto,
		@Param('id') taskId: string
	) {
		return this.commentService.create(userId, taskId, dto)
	}

	@Post('reply/:id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async replyToComment(
		@Param('id') commentId: string,
		@Body() dto: UpdateCommentDto
	) {
		return this.commentService.replyToComment(commentId, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
		const updatedProject = await this.commentService.update(id, dto)

		if (!updatedProject) throw new NotFoundException('Комментарий не найден')
		return updatedProject
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id') id: string) {
		const deletedProject = await this.commentService.delete(id)

		if (!deletedProject) throw new NotFoundException('Комментарий не найден')
		return deletedProject
	}
}
