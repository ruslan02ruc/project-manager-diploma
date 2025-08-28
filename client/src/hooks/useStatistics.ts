import { useQuery } from '@tanstack/react-query'

import { statisticsService } from '@/services/statistics.service'

export const useStatistics = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getProjectStatistics(),
		select: ({ data }) => data
	})

	return { data, isLoading }
}
