import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userService } from '@/services/user.service'

import { IUserEditInput } from '@/types/user.types'
import { TypeUpdateUserSchema } from '@/schemas/user/update-user.scema'

export function useUpdateUser() {
	const queryClient = useQueryClient()

	const { mutateAsync: updateUser } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: TypeUpdateUserSchema) =>
			userService.update(data),
		onSuccess() {
			toast.success('Пользователь обновлен')
			queryClient.invalidateQueries({
				queryKey: ['users']
			})
		},
		onError() {
			toast.error('Ошибка при обновлении')
		}
	})

	return { updateUser }
}
