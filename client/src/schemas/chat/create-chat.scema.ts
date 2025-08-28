import { z } from 'zod'

export const createChatSchema = z.object({
	content: z
		.string()
		.min(1, 'Минимальная длина 1 символ')
		.max(500, 'Максимальная длина 500 символов')
})

export type TypeCreateChatSchema = z.infer<typeof createChatSchema>
