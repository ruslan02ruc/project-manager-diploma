// const users = new Set<number>() // В реальности лучше использовать базу данных
import { Ctx, Start, Update } from 'nestjs-telegraf'
import { PrismaService } from 'src/prisma.service'
import { Context } from 'telegraf'

@Update()
export class TelegramUpdate {
	constructor(private prisma: PrismaService) {}

	@Start()
	async onStart(@Ctx() ctx: Context) {
		const chatId = String(ctx.chat.id)
		const telegramUsername = ctx.from?.username

		if (!telegramUsername) {
			await ctx.reply(
				'Ваш Telegram-аккаунт не имеет публичного username. Привязка невозможна.'
			)
			return
		}

		const user = await this.prisma.user.findFirst({
			where: { telegramName: telegramUsername }
		})

		if (!user) {
			await ctx.reply(
				`Пользователь с telegramName "${telegramUsername}" не найден. Убедитесь, что ваш username зарегистрирован в системе.`
			)
			return
		}

		await this.prisma.user.update({
			where: { id: user.id },
			data: { telegramId: chatId }
		})

		await ctx.reply(
			`Telegram успешно привязан к вашему аккаунту, ${user.name}.`
		)
	}

	onModuleDestroy() {
		console.log('Бот выключается...')
	}
}
