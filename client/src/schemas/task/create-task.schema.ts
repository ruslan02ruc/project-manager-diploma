import { z } from 'zod'

import { Priority, Status } from '@/libs/enums'

export const createTaskSchema = z.object({
	title: z.string().min(1, {
		message: 'Пожалуйста введите название минимально 1 символов'
	}),
	description: z.string().optional(),
	status: z.nativeEnum(Status),
	priority: z.nativeEnum(Priority),
	isArchive: z.boolean().optional(),
	startTime: z.string().datetime().nullable().optional(),
	endTime: z.string().datetime().nullable().optional()
})

export type TypeCreateTaskSchema = z.infer<typeof createTaskSchema>
