import { Module } from '@nestjs/common'
import { PusherModule } from 'src/pusher/pusher.module'
import { TelegramModule } from 'src/telegram/telegram.module'
import { TelegramService } from 'src/telegram/telegram.service'

import { PrismaService } from '../prisma.service'

import { TaskController } from './task.controller'
import { TaskService } from './task.service'

@Module({
	imports: [PusherModule, TelegramModule],
	controllers: [TaskController],
	providers: [TaskService, PrismaService, TelegramService]
})
export class TaskModule {}
