import { Prisma } from '@prisma/client'

export const returnTaskObject: Prisma.TaskSelect = {
	id: true,
	createdAt: true,
	title: true,
	description: true,
	status: true,
	priority: true,
	startTime: true,
	endTime: true,
	project: true,
	user: {
		omit: {
			id: true,
			createdAt: true,
			updatedAt: true,
			password: true
		}
	},
	subtasks: true,
	comments: true
}
