import { axiosWithAuth } from '@/api/interceptors'

import { ITask } from '@/types/task.types'

import { API_URL } from '@/libs/constants/api.constants'
import { TypeUpdateTaskSchema } from '@/schemas/task/update-task.schema'

class TaskService {
	async getTasksToProject(projectId: string) {
		return axiosWithAuth.get<ITask[]>(API_URL.tasks(`/${projectId}`))
	}

	async getById(id: string) {
		return axiosWithAuth.get<ITask>(API_URL.tasks(`/by-id/${id}`))
	}

	async create(projectId: string, data: TypeUpdateTaskSchema) {
		return axiosWithAuth.post<string>(API_URL.tasks(`/${projectId}`), data)
	}

	async subtask(id: string, taskId: string) {
		return axiosWithAuth.post<string>(API_URL.tasks(`subtask/${id}`), taskId)
	}

	async update(id: string, data: TypeUpdateTaskSchema) {
		return axiosWithAuth.put<string>(API_URL.tasks(`/${id}`), data)
	}

	async delete(id: string) {
		return axiosWithAuth.delete<string>(API_URL.tasks(`/${id}`))
	}
}

export const taskService = new TaskService()
