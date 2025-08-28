import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { assistantService } from '@/services/assistant.service'

import { TypeAddAssistantSchema } from '@/schemas/assistant/add-assistant.schema'

interface CreateAssistantParams {
	id: string
	data: TypeAddAssistantSchema
}

export function useCreateAssistant() {
	const queryClient = useQueryClient()

	const { mutateAsync: addAssistant } = useMutation({
		mutationKey: ['add assistant'],
		mutationFn: ({ id, data }: CreateAssistantParams) =>
			assistantService.create(id, data),
		onSuccess() {
			toast.success('Ассистент обновлен')
			queryClient.invalidateQueries({
				queryKey: ['assistants']
			})
		},
		onError() {
			toast.error('Ошибка при обновлении')
		}
	})

	return { addAssistant }
}
