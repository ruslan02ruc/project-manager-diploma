import { applyDecorators, UseGuards } from '@nestjs/common'

import { WsJwtGuard } from '../guard/ws-jwt.guard'

export function WsAuth() {
	return applyDecorators(UseGuards(WsJwtGuard))
}
