import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { projectService } from '@/services/project.service'

import { TypeArchiveProjectSchema } from '@/schemas/project/archive-project.schema'

interface UpdateProjectParams {
	id: string
	isArchive: TypeArchiveProjectSchema
}

export function useArchiveProject() {
	const queryClient = useQueryClient()

	const { mutateAsync: archiveProject } = useMutation({
		mutationKey: ['update project'],
		mutationFn: ({ id, isArchive }: UpdateProjectParams) =>
			projectService.updateArchive(id, isArchive),
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

	return { archiveProject }
}
