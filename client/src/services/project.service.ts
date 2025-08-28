import { axiosWithAuth } from '@/api/interceptors'

import { IProject, ProjectQueryParams } from '@/types/project.types'

import { API_URL } from '@/libs/constants/api.constants'
import { TypeCreateProjectSchema } from '@/schemas/project/create-project.schema'
import { TypeUpdateProjectSchema } from '@/schemas/project/update-project.schema'
import { TypeArchiveProjectSchema } from '@/schemas/project/archive-project.schema'

class ProjectService {
	async getAll(params?: ProjectQueryParams) {
		const { data } = await axiosWithAuth.get<IProject[]>(
			API_URL.projects(''),
			{
				params
			}
		)
		return data
	}

	async getAllStranger(params?: ProjectQueryParams) {
		const { data } = await axiosWithAuth.get<IProject[]>(
			API_URL.projects('/stranger'),
			{
				params
			}
		)
		return data
	}

	async getById(id: string) {
		const { data } = await axiosWithAuth.get<IProject>(
			API_URL.projects(`/by-id/${id}`)
		)

		return data
	}

	async getByStrangerId(id: string) {
		const { data } = await axiosWithAuth.get<IProject>(
			API_URL.projects(`/stranger/${id}`)
		)

		return data
	}

	async create(data: TypeCreateProjectSchema) {
		return axiosWithAuth.post<string>(API_URL.projects(''), data)
	}

	async update(id: string, data: TypeUpdateProjectSchema) {
		return axiosWithAuth.put<string>(API_URL.projects(`/${id}`), data)
	}

	async updateArchive(id: string, archive: TypeArchiveProjectSchema) {
		return axiosWithAuth.put<string>(API_URL.projects(`/${id}`), archive)
	}

	async delete(id: string) {
		return axiosWithAuth.delete<string>(API_URL.projects(`/${id}`))
	}
}

export const projectService = new ProjectService()
