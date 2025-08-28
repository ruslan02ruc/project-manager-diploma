'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
	useComments,
	useCreateComment,
	useDeleteComment,
	useUpdateComment
} from '@/hooks/comment/useComments'

export default function CommentList() {
	const taskId = 'cm8e9xr460008jjasy8p0n8ez'

	const { data: comments, isLoading } = useComments(taskId)
	const createCommentMutation = useCreateComment()
	const deleteCommentMutation = useDeleteComment()
	const updateCommentMutation = useUpdateComment()
	const queryClient = useQueryClient()
	const [message, setMessage] = useState('')

	const handleSubmit = () => {
		createCommentMutation.mutate({ id: taskId, data: { message } })
		setMessage('')
	}

	const handleUpdate = (id: string) => {
		updateCommentMutation.mutate({ id, data: { message: 'new' } })
	}

	const handleDelete = (id: string) => {
		deleteCommentMutation.mutate(id)
	}

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='space-y-4'>
			<ul>
				{comments?.data.map(comment => (
					<li
						key={comment.id}
						className='flex items-center justify-between'
					>
						<span>{comment.message}</span>
						<div className='space-x-2'>
							<button onClick={() => handleUpdate(comment.id)}>
								Edit
							</button>
							<button onClick={() => handleDelete(comment.id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>

			<div className='mt-4 flex gap-2'>
				<input
					type='text'
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='border p-2'
				/>
				<button
					onClick={handleSubmit}
					className='bg-blue-500 px-4 py-2 text-white'
				>
					Add Comment
				</button>
			</div>
		</div>
	)
}
