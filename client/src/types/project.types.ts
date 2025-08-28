import { IAssistant } from '@/types/assistant.types'
import { ITask } from '@/types/task.types'

import { Status } from '@/libs/enums'

export interface IProject {
	id: string
	title: string
	description?: string
	status: Status
	isArchive: boolean
	ownerId: string
	tasks: ITask[]
	projectMembers: IAssistant[]
}

export interface ProjectQueryParams {
	searchTerm?: string
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
	status?: string
	isArchive?: boolean
	title?: string
}
