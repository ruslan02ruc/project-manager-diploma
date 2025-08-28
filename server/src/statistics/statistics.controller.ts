import { Controller, Get, Param } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'

import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Get('project/:id')
	@Auth()
	async getProjectStats(@Param('id') id: string) {
		return this.statisticsService.projectStatistics(id)
	}

	@Get('user')
	@Auth()
	async getUserStats(@CurrentUser('id') id: string) {
		return this.statisticsService.userStatistics(id)
	}
}
