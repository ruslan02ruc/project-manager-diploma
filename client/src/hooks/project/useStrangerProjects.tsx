import { useQuery } from '@tanstack/react-query'

import { projectService } from '@/services/project.service'

import { ProjectQueryParams } from '@/types/project.types'

export function useStrangerProjects(params?: ProjectQueryParams) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['stranger-projects', params],
		queryFn: () => projectService.getAllStranger(params)
	})

	return { data, isLoading, error }
}
