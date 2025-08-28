import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/task.service'

import { TypeCreateTaskSchema } from '@/schemas/task/create-task.schema'

interface CreateTaskParams {
	id: string
	data: TypeCreateTaskSchema
}

export function useCreateTask() {
	const queryClient = useQueryClient()
	const { mutateAsync: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: ({ id, data }: CreateTaskParams) =>
			taskService.create(id, data),
		onSuccess() {
			toast.success('Задача создана')
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		},
		onError() {
			toast.error('Ошибка при создании')
		}
	})

	return { createTask }
}
