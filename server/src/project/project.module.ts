import { Module } from '@nestjs/common'
import { TelegramService } from 'src/telegram/telegram.service'

import { PrismaService } from '../prisma.service'

import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { TelegramModule } from 'src/telegram/telegram.module'

@Module({
	imports: [TelegramModule],
	controllers: [ProjectController],
	providers: [ProjectService, PrismaService, TelegramService]
})
export class ProjectModule {}
