import { z } from 'zod'

export const createProjectSchema = z.object({
	title: z.string().min(1, {
		message: 'Пожалуйста введите название минимально 1 символов'
	}),
	description: z
		.union([
			z.literal(''),
			z.string().min(1, {
				message: 'Пожалуйста введите описание минимально 1 символов'
			})
		])
		.optional()
})

export type TypeCreateProjectSchema = z.infer<typeof createProjectSchema>
