import { z } from 'zod'

export const archiveProjectSchema = z.object({
	isArchive: z.boolean()
})

export type TypeArchiveProjectSchema = z.infer<typeof archiveProjectSchema>
