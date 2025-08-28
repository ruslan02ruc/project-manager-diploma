import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/services/task.service'

export function useTask(id: string) {
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['task'],
		queryFn: () => taskService.getById(id)
	})

	return { data, refetch, isLoading }
}
