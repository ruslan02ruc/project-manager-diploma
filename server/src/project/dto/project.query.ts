import { Status } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsEnum, IsOptional } from 'class-validator'

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc'
}

export class GetProjectQueryDto {
	@IsOptional()
	title?: string

	@IsOptional()
	@IsEnum(Status)
	status?: Status

	@Transform(({ value }) => value === 'true')
	@IsOptional()
	isArchive?: boolean

	@IsOptional()
	sortBy?: string

	@IsOptional()
	sortOrder?: 'asc' | 'desc'
}
