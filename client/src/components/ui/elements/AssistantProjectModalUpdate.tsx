'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserCheck, UserSearch } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/common/Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/common/Form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/Popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

import { useAssistant } from '@/hooks/assistant/useAssistant'
import { useCreateAssistant } from '@/hooks/assistant/useCreateAssistant'
import { useDeleteAssistant } from '@/hooks/assistant/useDeleteAssistant'
import { useUpdateAssistant } from '@/hooks/assistant/useUpdateAssistant'
import { useSearchUser } from '@/hooks/useSearchUser'

import { Avatar, AvatarImage } from '../common/Avatar'

import { UserRole } from '@/libs/enums'
import { cn } from '@/libs/utils'
import {
	TypeAddAssistantSchema,
	addAssistantSchema
} from '@/schemas/assistant/add-assistant.schema'

interface IAssistantProject {
	projectId: string
	assistantId?: string
	open: boolean
	setOpen: (value: boolean) => void
	// setSelectedAssistantId: (value: string | null) => void
}
export function AssistantProjectModalUpdate({
	projectId,
	assistantId,
	open,
	setOpen
	// setSelectedAssistantId
}: IAssistantProject) {
	const { users, setSearchTerm } = useSearchUser()
	const { updateAssistant } = useUpdateAssistant()
	const { addAssistant } = useCreateAssistant()
	const { deleteAssistant } = useDeleteAssistant()
	const { data, refetch } = useAssistant(assistantId || '')

	const form = useForm<TypeAddAssistantSchema>({
		resolver: zodResolver(addAssistantSchema),
		defaultValues: {
			userId: '',
			role: UserRole.GUEST
		}
	})

	const onSubmit = async (data: TypeAddAssistantSchema) => {
		try {
			if (assistantId) {
				await updateAssistant({ id: assistantId, data })
				toast.success('Ассистент успешно обновлен')
			} else {
				await addAssistant({ id: projectId, data })
				toast.success('Ассистент успешно добавлен')
			}
			setOpen(false)
			// setSelectedAssistantId(null)
			form.reset()
		} catch (error) {
			toast.error(`Ошибка при  добавлении ассистента: ${error}`)
		}
	}

	useEffect(() => {
		refetch()
		if (data?.data) {
			form.setValue('userId', data.data?.user.id)
			form.setValue('role', data.data?.role)
			setSearchTerm(data.data?.user.email)
		}
	}, [form, assistantId])

	function handleOnChange(value: string) {
		setSearchTerm(value)
	}

	function handleDeleteAssistant() {
		deleteAssistant({ id: assistantId || '' })
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='w-1/4'>
				<DialogHeader>
					<DialogTitle>
						{assistantId ? 'Обновить ассистент' : 'Добавить ассистента'}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mt-4 space-y-6'
					>
						<FormField
							control={form.control}
							name='userId'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Email</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn(
														'justify-between',
														!field.value &&
															'text-muted-foreground'
													)}
												>
													{field.value
														? users?.find(
																user => user.id === field.value
															)?.email
														: 'Поиск пользователя'}
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
																className='cursor-pointer'
																value={user.email}
																key={user.id}
																onSelect={() => {
																	form.setValue(
																		'userId',
																		user.id
																	)
																}}
															>
																<Avatar className='size-6'>
																	<AvatarImage
																		src={user.avatar}
																		alt={user.name}
																	/>
																</Avatar>
																{user.email}
																<UserCheck
																	className={cn(
																		'ml-auto',
																		user.id === field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
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
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Роль</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className='w-full'>
											<SelectTrigger>
												<SelectValue placeholder='Роль' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(UserRole).map(role => (
												<SelectItem key={role} value={role}>
													{role}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<Button className='w-full cursor-pointer' type='submit'>
							Добавить
						</Button>
						{assistantId && (
							<Button
								className='w-full cursor-pointer'
								variant='destructive'
								type='submit'
								onClick={handleDeleteAssistant}
							>
								Удалить
							</Button>
						)}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
