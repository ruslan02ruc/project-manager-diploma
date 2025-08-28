import { z } from 'zod'

export const createAccountSchema = z.object({
	name: z.string().min(3, {
		message: 'Пожалуйста введите имя'
	}),
	email: z
		.string()
		.email({ message: 'Пожалуйста введите корректный email' })
		.min(5, {
			message: 'Email обязательно'
		}),
	password: z.string().min(5, {
		message: 'Пароль должен содержать 6 символов'
	})
})

export type TypeCreateAccountSchema = z.infer<typeof createAccountSchema>
