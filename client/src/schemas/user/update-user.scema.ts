import { z } from 'zod'

export const updateUserSchema = z.object({
	name: z.string().min(3, {
		message: 'Пожалуйста введите имя'
	}),
	email: z
		.string()
		.email({ message: 'Пожалуйста введите корректный email' })
		.min(5, {
			message: 'Email обязательно'
		}),
	// password: z.string().min(5, {
	// 	message: 'Пароль должен содержать 6 символов'
	// }),
	avatar: z.string().optional(),
	telegramName: z.string().optional()
})

export type TypeUpdateUserSchema = z.infer<typeof updateUserSchema>
