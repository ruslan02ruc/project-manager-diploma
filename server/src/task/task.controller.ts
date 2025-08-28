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

import { TaskDto } from './dto/task.dto'
import { GetTasksQueryDto } from './dto/task.dto.query'
import { TaskService } from './task.service'

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get(':id')
	async getTasks(
		@Param('id') projectId: string,
		@Query(new ValidationPipe({ transform: true })) query: GetTasksQueryDto
	) {
		return this.taskService.getAll(projectId, query)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.taskService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@Post(':id')
	@HttpCode(200)
	@Auth()
	async create(@Param('id') projectId: string, @Body() dto: TaskDto) {
		return this.taskService.create(projectId, dto)
	}

	@Post('subtask/:id')
	@HttpCode(200)
	@Auth()
	async subtask(@Param('id') taskId: string, @Body() dto: TaskDto) {
		return this.taskService.subtask(taskId, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth()
	async update(@Param('id') id: string, @Body() dto: TaskDto) {
		const updatedProject = await this.taskService.update(id, dto)

		if (!updatedProject) throw new NotFoundException('Задача не найден')
		return updatedProject
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		const deletedProject = await this.taskService.delete(id)

		if (!deletedProject) throw new NotFoundException('Задача не найден')
		return deletedProject
	}

	// private taskUpdates$ = new Subject<TaskDto>();
	// @Sse('sse')
	// sse(): Observable<MessageEvent> {
	//   return this.taskUpdates$.pipe(
	//     map((data): MessageEvent => ({
	//       data,
	//       id: new Date().toISOString(),
	//       type: 'message',
	//       retry: 10000
	//     }))
	//   );
	// }

	// pushUpdate(task: TaskDto) {
	//   this.taskUpdates$.next(task);
	// }
}
