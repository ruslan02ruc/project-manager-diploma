import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { assistantService } from '@/services/assistant.service'

interface DeleteAssistantParams {
	id: string
}

export function useDeleteAssistant() {
	const queryClient = useQueryClient()

	const { mutateAsync: deleteAssistant } = useMutation({
		mutationKey: ['add assistant'],
		mutationFn: ({ id }: DeleteAssistantParams) =>
			assistantService.delete(id),
		onSuccess() {
			toast.success('Ассистент удален')
			queryClient.invalidateQueries({
				queryKey: ['assistants']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	return { deleteAssistant }
}
