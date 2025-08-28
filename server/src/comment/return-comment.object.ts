import { Prisma } from '@prisma/client'

export const returnCommentObject: Prisma.CommentSelect = {
	id: true,
	createdAt: true,
	message: true,
	user: true
}
