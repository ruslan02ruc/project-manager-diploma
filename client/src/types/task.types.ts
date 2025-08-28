import { Priority, Status } from '@/libs/enums'

export interface ITask {
	id: string
	title: string
	description?: string
	status: Status
	priority: Priority
	startTime?: Date
	endTime?: Date
	isArchive?: boolean
	projectId: string
	userId: string
	// task: ITask
	// subtasks: ITask[]
	// comments: IComment[]
}
