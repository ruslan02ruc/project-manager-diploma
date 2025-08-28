import { useQuery } from '@tanstack/react-query'

import { projectService } from '@/services/project.service'

import { ProjectQueryParams } from '@/types/project.types'

export function useProjects(params?: ProjectQueryParams) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['projects', params],
		queryFn: () => projectService.getAll(params)
	})

	return { data, isLoading, error }
}
