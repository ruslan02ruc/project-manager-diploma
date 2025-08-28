import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { assistantService } from '@/services/assistant.service'

import { TypeAddAssistantSchema } from '@/schemas/assistant/add-assistant.schema'

interface AssistantParams {
	id: string
	data: TypeAddAssistantSchema
}

export function useUpdateAssistant() {
	const queryClient = useQueryClient()

	const { mutateAsync: updateAssistant } = useMutation({
		mutationKey: ['update assistant'],
		mutationFn: ({ id, data }: AssistantParams) =>
			assistantService.update(id, data),
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

	return { updateAssistant }
}
