import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PusherService } from 'src/pusher/pusher.service'

import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
	controllers: [ChatController],
	providers: [ChatService, PrismaService, PusherService, PusherService]
})
export class ChatModule {}
