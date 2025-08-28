import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { chatService } from '@/services/chat.service'

import { TypeCreateChatSchema } from '@/schemas/chat/create-chat.scema'

export const useChats = () => {
	return useQuery({
		queryKey: ['chats'],
		queryFn: () => chatService.getAll()
	})
}

export const useChatById = (id: string) => {
	return useQuery({
		queryKey: ['chats', id],
		queryFn: () => chatService.getById(id)
	})
}

interface ChatParams {
	id: string
}

interface MessageParams {
	id: string
	data: TypeCreateChatSchema
}

export const useCreatePrivateChat = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id }: ChatParams) => chatService.createPrivateChat(id),
		onSuccess: () => {
			toast.success('Чат создан')
			queryClient.invalidateQueries({
				queryKey: ['chats']
			})
		}
	})
}

export const useGetMessages = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id }: ChatParams) => chatService.getMessages(id),
		onSuccess: () => {
			toast.success('Чат получен')
			queryClient.invalidateQueries({
				queryKey: ['chats']
			})
		}
	})
}

export const useSendMessage = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: MessageParams) =>
			chatService.sendMessage(id, data),
		onSuccess: () => {
			toast.success('Чат получен')
			queryClient.invalidateQueries({
				queryKey: ['chats']
			})
		}
	})
}
