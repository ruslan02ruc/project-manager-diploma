import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizontal } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/common/Form'
import { Textarea } from '@/components/ui/common/Textarea'

import { useSendMessage } from '@/hooks/chat/useChats'

import {
	TypeCreateChatSchema,
	createChatSchema
} from '@/schemas/chat/create-chat.scema'

interface IChatForm {
	chatId: string
}

export function ChatForm({ chatId }: IChatForm) {
	const form = useForm<TypeCreateChatSchema>({
		resolver: zodResolver(createChatSchema),
		defaultValues: {
			content: ''
		},
		mode: 'onChange'
	})

	const { mutate } = useSendMessage()

	const onSubmit: SubmitHandler<TypeCreateChatSchema> = data => {
		mutate({ id: chatId, data })
		form.reset()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex w-3/4 items-center space-y-4'
			>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Textarea
									placeholder='Отпавить сообщение'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' size='icon' className='ml-5 cursor-pointer'>
					<SendHorizontal />
				</Button>
			</form>
		</Form>
	)
}
