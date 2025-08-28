import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/services/task.service'

export function useTasks(id: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasksToProject(id)
	})

	return { data, isLoading }
}
