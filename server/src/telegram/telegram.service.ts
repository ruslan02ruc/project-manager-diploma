import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { PrismaService } from 'src/prisma.service'
import { Telegraf, Context as TelegrafContext } from 'telegraf'

export interface TelegramContext extends TelegrafContext {
	startPayload?: string
}

@Injectable()
export class TelegramService {
	constructor(
		@InjectBot() private readonly bot: Telegraf<any>,
		private prisma: PrismaService
	) {}

	async notifyProjectMembers(projectId: string, message: string) {
		const members = await this.prisma.projectMember.findMany({
			where: { projectId },
			select: {
				user: {
					select: {
						telegramId: true,
						name: true
					}
				}
			}
		})

		for (const member of members) {
			const telegramId = member.user.telegramId
			if (telegramId) {
				try {
					await this.bot.telegram.sendMessage(telegramId, message, {
						parse_mode: 'MarkdownV2'
					})
				} catch (error) {
					console.error(
						`Ошибка при отправке уведомления ${telegramId}:`,
						error
					)
				}
			}
		}
	}
}
