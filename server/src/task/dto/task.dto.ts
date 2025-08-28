import { Priority, Status } from '@prisma/client'
import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsOptional,
	IsString
} from 'class-validator'

export class TaskDto {
	@IsString()
	@IsOptional()
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsEnum(Status)
	status: Status = Status.TODO

	@IsEnum(Priority)
	priority: Priority = Priority.LOW

	@IsDateString()
	@IsOptional()
	startTime?: string

	@IsDateString()
	@IsOptional()
	endTime?: string

	@IsOptional()
	userId: string

	@IsBoolean()
	isArchive: boolean = false
}
