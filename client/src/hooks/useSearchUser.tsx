import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { userService } from '@/services/user.service'

import { useDebounce } from './useDebounce'

export const useSearchUser = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { data: users, isLoading } = useQuery({
		queryKey: ['users', 'assistants', debouncedSearch],
		queryFn: () => userService.getAll(debouncedSearch),
		enabled: !!debouncedSearch
	})

	return { users, isLoading, setSearchTerm }
}
