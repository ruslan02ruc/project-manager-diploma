import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { assistantService } from '@/services/assistant.service'

import { useDebounce } from '../useDebounce'

export function useAssistant(id: string) {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { data, isLoading } = useQuery({
		queryKey: ['assistants'],
		queryFn: () => assistantService.getAll(id, debouncedSearch),
		enabled: !!id
	})

	return { data, isLoading, setSearchTerm }
}
