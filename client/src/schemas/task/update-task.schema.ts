import { z } from 'zod'

import { Priority, Status } from '@/libs/enums'

export const updateTaskSchema = z.object({
	title: z
		.string()
		.min(1, {
			message: 'Пожалуйста введите название минимально 1 символов'
		})
		.optional(),
	description: z.string().optional(),
	status: z.nativeEnum(Status).optional(),
	priority: z.nativeEnum(Priority).optional(),
	isArchive: z.boolean().optional(),
	// startTime: z
	// 	.date({
	// 		required_error: 'Дата начало'
	// 	})
	// 	.optional(),
	startTime: z.string().datetime().nullable().optional(),
	endTime: z.string().datetime().nullable().optional(),
	userId: z.string().optional()
})

export type TypeUpdateTaskSchema = z.infer<typeof updateTaskSchema>
