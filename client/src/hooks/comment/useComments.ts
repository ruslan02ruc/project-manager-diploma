import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { commentService } from '@/services/commnet.service'

import { ICommentEditInput } from '@/types/comment.types'

export const useComments = (id: string) => {
	return useQuery({
		queryKey: ['comments', id],
		queryFn: () => commentService.getById(id)
	})
}

interface CreateCommentParams {
	id: string
	data: ICommentEditInput
}

export const useCreateComment = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: CreateCommentParams) =>
			commentService.create(id, data),
		onSuccess: () => {
			toast.success('Комментарий создан')
			queryClient.invalidateQueries({
				queryKey: ['comments']
			})
		}
	})
}

export const useUpdateComment = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, data }: CreateCommentParams) =>
			commentService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['comments']
			})
		}
	})
}

export const useDeleteComment = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => commentService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['comments']
			})
		}
	})
}
