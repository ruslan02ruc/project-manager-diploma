import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/common/Form'
import { Textarea } from '@/components/ui/common/Textarea'

import { useCreateComment } from '@/hooks/comment/useComments'

import {
	TypeCreateCommentSchema,
	createCommentSchema
} from '@/schemas/commnent/create-commnet.schema'

interface ICommentForm {
	id: string
}

export default function CommentForm({ id }: ICommentForm) {
	const createCommentMutation = useCreateComment()

	const form = useForm<TypeCreateCommentSchema>({
		resolver: zodResolver(createCommentSchema),
		defaultValues: {
			message: ''
		},
		mode: 'onChange'
	})
	const onSubmit = async (data: TypeCreateCommentSchema) => {
		try {
			console.log({
				id,
				data: {
					message: data.message
				}
			})

			createCommentMutation.mutate({
				id,
				data: {
					message: data.message
				}
			})
			form.reset()
		} catch (error) {
			toast.error(`Ошибка при обновлении задачи: ${error}`)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder='Добавить комментарий'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex gap-4'>
					<Button className='cursor-pointer'>Отмена</Button>
					<Button type='submit' className='cursor-pointer'>
						Сохранить
					</Button>
				</div>
			</form>
		</Form>
	)
}
