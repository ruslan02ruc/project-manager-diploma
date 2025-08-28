import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

import { IAssistant } from '@/types/assistant.types'

import { API_URL } from '@/libs/constants/api.constants'
import { TypeAddAssistantSchema } from '@/schemas/assistant/add-assistant.schema'

class AssistantService {
	async getAll(id: string, searchTerm?: string) {
		return await axiosClassic.get<IAssistant[]>(API_URL.assistant(`/${id}`), {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	}

	async getById(id: string) {
		return axiosWithAuth.get<IAssistant>(API_URL.assistant(`/by-id/${id}`))
	}

	async create(id: string, data: TypeAddAssistantSchema) {
		return axiosWithAuth.post<string>(API_URL.assistant(`/${id}`), data)
	}

	async update(id: string, data: TypeAddAssistantSchema) {
		return axiosWithAuth.put<string>(API_URL.assistant(`/${id}`), data)
	}

	async delete(id: string) {
		return axiosWithAuth.delete<string>(API_URL.assistant(`/${id}`))
	}
}

export const assistantService = new AssistantService()
