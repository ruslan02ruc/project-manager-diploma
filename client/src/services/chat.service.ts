import { axiosWithAuth } from '@/api/interceptors'

import { IChat } from '@/types/chat.types'
import { ICommentEditInput } from '@/types/comment.types'

import { API_URL } from '@/libs/constants/api.constants'
import { TypeCreateChatSchema } from '@/schemas/chat/create-chat.scema'

class ChatService {
	async getAll() {
		return axiosWithAuth.get<IChat[]>(API_URL.chat(''))
	}

	async getById(id: string) {
		return axiosWithAuth.get<IChat>(API_URL.chat(`/${id}`))
	}

	async createPrivateChat(id: string) {
		return axiosWithAuth.post<string>(API_URL.chat(`/private/${id}`))
	}

	async createGroupChat(data: IChat) {
		return axiosWithAuth.post<string>(API_URL.chat(`/group`), data)
	}

	async addMember(id: string, data: ICommentEditInput) {
		return axiosWithAuth.put<string>(API_URL.chat(`/${id}/members`), data)
	}

	async removeMember(id: string) {
		return axiosWithAuth.delete<string>(API_URL.chat(`/${id}`))
	}

	async getMessages(id: string) {
		return axiosWithAuth.get<IChat[]>(API_URL.chat(`/${id}/messages`))
	}

	async sendMessage(id: string, data: TypeCreateChatSchema) {
		return axiosWithAuth.post<string>(API_URL.chat(`/${id}/messages`), data)
	}
}

export const chatService = new ChatService()
