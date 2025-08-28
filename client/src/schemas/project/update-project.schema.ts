import { z } from 'zod'

import { Status } from '@/libs/enums'

export const updateProjectSchema = z.object({
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
		.optional(),
	status: z.nativeEnum(Status),
	ownerId: z.string()
})

export type TypeUpdateProjectSchema = z.infer<typeof updateProjectSchema>
