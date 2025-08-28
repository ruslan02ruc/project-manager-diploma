import { zodResolver } from '@hookform/resolvers/zod'
import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon, UserCheck, UserSearch } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Avatar, AvatarImage } from '@/components/ui/common/Avatar'
import { Button } from '@/components/ui/common/Button'
import { Calendar } from '@/components/ui/common/Calendar'
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
	FormLabel,
	FormMessage
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import { PopoverContent, PopoverTrigger } from '@/components/ui/common/Popover'
import { ScrollArea } from '@/components/ui/common/ScrollArea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetDescription,
// 	SheetHeader,
// 	SheetTitle
// } from '@/components/ui/common/Sheet'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/common/Sheet'
import CommentForm from '@/components/ui/elements/CommentForm'

import { useAssistant } from '@/hooks/assistant/useAssistants'
import { useComments } from '@/hooks/comment/useComments'
import { usePusherComments } from '@/hooks/comment/usePusherComments'
import { useTask } from '@/hooks/task/useTask'
import { useUpdateTask } from '@/hooks/task/useUpdateTask'

import { Priorities, Priority, Status, StatusOptions } from '@/libs/enums'
import { cn } from '@/libs/utils'
import {
	TypeUpdateTaskSchema,
	updateTaskSchema
} from '@/schemas/task/update-task.schema'

interface ITaskForm {
	id: string
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	projectId: string
}

export default function TaskForm({
	id,
	isOpen,
	setIsOpen,
	projectId
}: ITaskForm) {
	const [shouldFetch, setShouldFetch] = useState(false)
	const { data, refetch } = useTask(id)
	const { updateTask } = useUpdateTask()
	const { data: comments } = useComments(id)

	const { data: assistants, setSearchTerm } = useAssistant(projectId)

	const form = useForm<TypeUpdateTaskSchema>({
		resolver: zodResolver(updateTaskSchema),
		defaultValues: {
			title: '',
			description: '',
			status: Status.TODO,
			priority: Priority.LOW,
			isArchive: false,
			startTime: undefined,
			endTime: undefined,
			userId: ''
		},
		mode: 'onChange'
	})

	useEffect(() => {
		if (isOpen && id) refetch()
	}, [isOpen, id, refetch])

	useEffect(() => {
		if (data?.data) {
			const formattedData = {
				...data.data,
				startTime: data.data.startTime
					? new Date(data.data.startTime).toISOString()
					: null,
				endTime: data.data.endTime
					? new Date(data.data.endTime).toISOString()
					: null
			}
			form.reset(formattedData)
			form.setValue('status', data.data.status)
			form.setValue('priority', data.data.priority)
		}
	}, [data, form])

	const onSubmit = async (data: TypeUpdateTaskSchema) => {
		try {
			await updateTask({ id, data })
			setIsOpen(false)
			form.reset()
		} catch (error) {
			const { toast } = await import('sonner')
			toast.error(`Ошибка при обновлении задачи: ${error}`)
		}
	}

	function handleOnChange(value: string) {
		setSearchTerm(value)
	}

	usePusherComments()

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className='lg:!w-3/7 flex h-full !w-full !max-w-none flex-col px-4 sm:!w-1/2'>
				<ScrollArea className='flex-grow overflow-auto pt-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-2'
						>
							<SheetTitle>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder='Название' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</SheetTitle>

							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder='Описание' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex gap-4'>
								<FormField
									control={form.control}
									name='status'
									render={({ field }) => (
										<FormItem>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Статус' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{StatusOptions.map(status => (
														<SelectItem
															key={status.value}
															value={status.value}
														>
															<div className='flex items-center gap-2'>
																<status.icon />
																{status.label}
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='priority'
									render={({ field }) => (
										<FormItem>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Приоритет' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Priorities.map(priority => (
														<SelectItem
															key={priority.value}
															value={priority.value}
														>
															<div className='flex items-center gap-2'>
																<priority.icon />
																{priority.label}
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex gap-4'>
								<FormField
									control={form.control}
									name='startTime'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Дата начала</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[240px] pl-3 text-left font-normal',
																!field.value &&
																	'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(
																	new Date(field.value),
																	'PPP'
																)
															) : (
																<span>Выберите дату</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0'
													align='start'
												>
													<Calendar
														initialFocus
														mode='single'
														defaultMonth={
															field.value
																? new Date(field.value)
																: undefined
														}
														selected={
															field.value
																? new Date(field.value)
																: undefined
														}
														onSelect={date =>
															field.onChange(
																date ? date.toISOString() : null
															)
														}
														numberOfMonths={1}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='endTime'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Дата конца</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={cn(
																'w-[240px] pl-3 text-left font-normal',
																!field.value &&
																	'text-muted-foreground'
															)}
														>
															{field.value ? (
																format(
																	new Date(field.value),
																	'PPP'
																)
															) : (
																<span>Выберите дату</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0'
													align='start'
												>
													<Calendar
														initialFocus
														mode='single'
														defaultMonth={
															field.value
																? new Date(field.value)
																: undefined
														}
														selected={
															field.value
																? new Date(field.value)
																: undefined
														}
														onSelect={date =>
															field.onChange(
																date ? date.toISOString() : null
															)
														}
														numberOfMonths={1}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='userId'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Ассистент</FormLabel>
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
															? assistants?.data.find(
																	user =>
																		user.user.id ===
																		field.value
																)?.user.email
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
															{assistants?.data.map(user => (
																<CommandItem
																	className='cursor-pointer'
																	value={user.user.email}
																	key={user.id}
																	onSelect={() => {
																		form.setValue(
																			'userId',
																			user.user.id
																		)
																	}}
																>
																	<Avatar className='size-6'>
																		<AvatarImage
																			src={user.user.avatar}
																			alt={user.user.name}
																		/>
																	</Avatar>
																	{user.user.email}
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
							<Button type='submit' className='mt-2 cursor-pointer'>
								Сохранить
							</Button>
						</form>
					</Form>
				</ScrollArea>
				<ScrollArea className='h-1/4'>
					{comments?.data.map(commnet => (
						<div key={commnet.id}>
							<span>{commnet.user.email}</span>
							{' : '}
							<span>{commnet.message}</span>
						</div>
					))}
				</ScrollArea>
				<div className='mt-auto h-36 border-t pt-4'>
					<CommentForm id={id} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
