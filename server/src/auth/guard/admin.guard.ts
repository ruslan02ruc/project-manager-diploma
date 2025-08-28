import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { User, UserRole } from '@prisma/client'

import { PrismaService } from '../../prisma.service'

@Injectable()
export class OnlyAdminGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		const projectMember = await this.prisma.projectMember.findFirst({
			where: {
				userId: user.id,
				role: UserRole.ADMIN
			}
		})

		if (!projectMember)
			throw new ForbiddenException(
				'У вас недостаточно прав для выполнения этой операции'
			)

		return true
	}
}
