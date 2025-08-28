import { z } from 'zod'

export const loginSchema = z.object({
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

export type TypeLoginSchema = z.infer<typeof loginSchema>
