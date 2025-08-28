import { applyDecorators, UseGuards } from '@nestjs/common'

import { TypeRole } from '../auth.interface'
import { OnlyAdminGuard } from '../guard/admin.guard'
import { JwtAuthGuard } from '../guard/jwt.guard'

export function Auth(role: TypeRole = 'user') {
	return applyDecorators(
		role === 'admin'
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	)
}
