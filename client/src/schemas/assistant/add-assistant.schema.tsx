import { z } from 'zod'

import { UserRole } from '@/libs/enums'

export const addAssistantSchema = z.object({
  userId: z.string().min(1, 'Выберите пользователя'),
  role: z.nativeEnum(UserRole)
})

export type TypeAddAssistantSchema = z.infer<typeof addAssistantSchema>
