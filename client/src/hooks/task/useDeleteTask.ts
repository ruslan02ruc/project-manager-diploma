import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/task.service'

export function useDeleteTask() {
	const queryClient = useQueryClient()

	const { mutateAsync: deleteTask } = useMutation({
		mutationKey: ['delete task'],
		mutationFn: (id: string) => taskService.delete(id),
		onSuccess() {
			toast.success('Задача удалена')
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	return { deleteTask }
}
