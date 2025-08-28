import { useQuery } from '@tanstack/react-query'

import { assistantService } from '@/services/assistant.service'

export function useAssistant(id: string) {
	const { data, refetch } = useQuery({
		queryKey: ['assistant'],
		queryFn: () => assistantService.getById(id),
		enabled: !!id
	})

	return { data, refetch }
}
