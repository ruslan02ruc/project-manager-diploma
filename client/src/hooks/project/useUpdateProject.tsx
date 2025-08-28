import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { projectService } from '@/services/project.service'

import { TypeUpdateProjectSchema } from '@/schemas/project/update-project.schema'

interface UpdateProjectParams {
	id: string
	data: TypeUpdateProjectSchema
}

export function useUpdateProject() {
	const queryClient = useQueryClient()

	const { mutateAsync: updateProject } = useMutation({
		mutationKey: ['update project'],
		mutationFn: ({ id, data }: UpdateProjectParams) =>
			projectService.update(id, data),
		onSuccess() {
			toast.success('Проект обновлен')
			queryClient.invalidateQueries({
				queryKey: ['projects']
			})
		},
		onError() {
			toast.error('Ошибка при обновлении')
		}
	})

	return { updateProject }
}
