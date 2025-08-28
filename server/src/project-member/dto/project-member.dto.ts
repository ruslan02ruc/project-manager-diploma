import { UserRole } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class ProjectMemberDto {
	@IsString({ message: 'ID пользователя не указан' })
	userId: string

	@IsEnum(UserRole)
	role: UserRole = UserRole.USER
}
