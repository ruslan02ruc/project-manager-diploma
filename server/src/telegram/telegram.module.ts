import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { TelegramUpdate } from './telegram.update'

@Module({
	providers: [TelegramUpdate, PrismaService]
})
export class TelegramModule {}
