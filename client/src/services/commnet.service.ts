import { axiosWithAuth } from '@/api/interceptors'

import { IComment, ICommentEditInput } from '@/types/comment.types'

import { API_URL } from '@/libs/constants/api.constants'

class CommentService {
	async getById(id: string) {
		return axiosWithAuth.get<IComment[]>(API_URL.comments(`/by-id/${id}`))
	}

	async create(id: string, data: ICommentEditInput) {
		return axiosWithAuth.post<string>(API_URL.comments(`/${id}`), data)
	}

	async replyToComment(id: string, data: ICommentEditInput) {
		return axiosWithAuth.post<string>(API_URL.comments(`/reply/${id}`), data)
	}

	async update(id: string, data: ICommentEditInput) {
		return axiosWithAuth.put<string>(API_URL.comments(`/${id}`), data)
	}

	async delete(id: string) {
		return axiosWithAuth.delete<string>(API_URL.comments(`/${id}`))
	}
}

export const commentService = new CommentService()
