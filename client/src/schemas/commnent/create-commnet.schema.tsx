import { z } from 'zod'

export const createCommentSchema = z.object({
	message: z
		.string()
		.min(1, 'Минимальная длина 1 символ')
		.max(500, 'Максимальная длина 500 символов')
})

export type TypeCreateCommentSchema = z.infer<typeof createCommentSchema>
