// dto/get-tasks.query.ts
import { Priority, Status } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsDateString, IsEnum, IsOptional } from 'class-validator'

export class GetTasksQueryDto {
	@IsOptional()
	title?: string

	@IsOptional()
	@IsEnum(Status)
	status?: Status

	@IsOptional()
	@IsEnum(Priority)
	priority?: Priority

	@Transform(({ value }) => value === 'true')
	@IsOptional()
	isArchive?: boolean

	@IsOptional()
	@IsDateString()
	startTimeFrom?: string

	@IsOptional()
	@IsDateString()
	startTimeTo?: string

	@IsOptional()
	sortBy?: string

	@IsOptional()
	sortOrder?: 'asc' | 'desc'
}
