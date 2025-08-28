import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { projectService } from '@/services/project.service'
import { TypeCreateProjectSchema } from '@/schemas/project/create-project.schema'


export function useCreateProject() {
	const queryClient = useQueryClient()
	const { mutateAsync: createProject } = useMutation({
		mutationKey: ['create project'],
		mutationFn: (data: TypeCreateProjectSchema) => projectService.create(data),
		onSuccess() {
			toast.success('Проект создан')
			queryClient.invalidateQueries({
				queryKey: ['projects']
			})
		},
		onError() {
			toast.error('Ошибка при создании')
		}
	})

	return { createProject }
}
