import { Prisma } from '@prisma/client'

export const returnProjectMemberObject: Prisma.ProjectMemberSelect = {
	id: true,
	createdAt: true,
	project: false,
	user: {
		select: {
			id: true,
			email: true,
			name: true,
			avatar: true
		}
	},
	role: true
}
