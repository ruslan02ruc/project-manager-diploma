'use client'

import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useUser(id: string) {
	const { data } = useQuery({
		queryKey: ['user', id],
		queryFn: () => userService.getById(id),
		enabled: !!id
	})

	return { data }
}
