export interface IStatistics {
	totalTasks: number
	doneTasks: number
	progress: number
	totalProjects: number
	rolesCount: {
		role: string
		count: number
	}[]
}
