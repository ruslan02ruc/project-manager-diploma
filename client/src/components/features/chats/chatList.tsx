import { zodResolver } from '@hookform/resolvers/zod'
import { Send, UserSearch } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarImage } from '@/components/ui/common/Avatar'
import { Button } from '@/components/ui/common/Button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/common/Command'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/common/Form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/Popover'

import { useChats, useCreatePrivateChat } from '@/hooks/chat/useChats'
import { usePusherChat } from '@/hooks/chat/usePusherChat'
import { useSearchUser } from '@/hooks/useSearchUser'

import ChatUserItem from './chatUserItem'

export default function ChatUserList({
	children
}: {
	children: React.ReactNode
}) {
	const { data, refetch } = useChats()
	const { users, isLoading, setSearchTerm } = useSearchUser()
	const { mutateAsync: addChat } = useCreatePrivateChat()

	const chatAssistantSchema = z.object({
		userId: z.string().min(1, 'Выберите пользователя')
	})

	type TypeChatAssistantSchema = z.infer<typeof chatAssistantSchema>

	const form = useForm<TypeChatAssistantSchema>({
		resolver: zodResolver(chatAssistantSchema),
		defaultValues: {
			userId: ''
		}
	})

	const onSubmit = async (data: TypeChatAssistantSchema) => {
		try {
			console.log(data)

			await addChat({ id: data.userId })
			// await addAssistant({ id: projectId, data })
			form.reset()
		} catch (error) {
			toast.error(`Ошибка при  добавлении ассистента: ${error}`)
		}
	}

	function handleOnChange(value: string) {
		setSearchTerm(value)
	}

	const pusherChat = usePusherChat()

	useEffect(() => {
		refetch()
	}, [pusherChat])

	return (
		<div className='flex h-full w-full'>
			<div className='w-[170px] mr-4'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mt-4 space-y-6'
					>
						<FormField
							control={form.control}
							name='userId'
							render={({ field }) => (
								<FormItem className='flex w-full flex-col'>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={
														'text-muted-foreground justify-between text-xs'
													}
												>
													Поиск пользователя
													<UserSearch className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='p-0'>
											<Command>
												<CommandInput
													placeholder='Поиск пользователя...'
													onValueChange={handleOnChange}
												/>
												<CommandList>
													<CommandEmpty>
														Нету пользователя.
													</CommandEmpty>
													<CommandGroup>
														{users?.map(user => (
															<CommandItem
																className='justify-between'
																value={user.email}
																key={user.id}
															>
																<div className='flex items-center gap-2'>
																	<Avatar className='size-6'>
																		<AvatarImage
																			src={user.avatar}
																			alt={user.name}
																		/>
																	</Avatar>
																	{user.email}
																</div>
																<Button
																	type='submit'
																	size='icon'
																	className='size-7 cursor-pointer'
																	onClick={() => {
																		form.setValue(
																			'userId',
																			user.id
																		)
																		form.handleSubmit(
																			onSubmit
																		)()
																	}}
																>
																	<Send />
																</Button>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				{data?.data.map(chat => (
					<ChatUserItem
						userId={chat.members.userId}
						chatId={chat.id}
						key={chat.members.id}
					/>
				))}
			</div>
			{children}
		</div>
	)
}
