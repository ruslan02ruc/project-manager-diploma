import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/task.service'

import { TypeUpdateTaskSchema } from '@/schemas/task/update-task.schema'

interface UpdateTaskParams {
	id: string
	data: TypeUpdateTaskSchema
}

export function useUpdateTask() {
	const queryClient = useQueryClient()

	const { mutateAsync: updateTask } = useMutation({
		mutationKey: ['update task'],
		mutationFn: ({ id, data }: UpdateTaskParams) =>
			taskService.update(id, data),
		onSuccess() {
			toast.success('Задача обновлена')
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		},
		onError() {
			toast.error('Ошибка при обновлении')
		}
	})

	return { updateTask }
}
