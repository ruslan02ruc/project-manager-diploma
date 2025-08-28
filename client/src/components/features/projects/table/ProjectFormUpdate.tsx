'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserCheck, UserSearch } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { Input } from '@/components/ui/common/Input'
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

import { useProject } from '@/hooks/project/useProject'
import { useUpdateProject } from '@/hooks/project/useUpdateProject'
import { useSearchUser } from '@/hooks/useSearchUser'

import { Status, StatusOptions } from '@/libs/enums'
import { cn } from '@/libs/utils'
import {
	TypeUpdateProjectSchema,
	updateProjectSchema
} from '@/schemas/project/update-project.schema'

interface IProjectForm {
	id: string
	open: boolean
	setOpen: (value: boolean) => void
}

export default function ProjectFormUpdate({ id, open, setOpen }: IProjectForm) {
	const [shouldFetch, setShouldFetch] = useState(false)
	const { users, setSearchTerm } = useSearchUser()
	const { updateProject } = useUpdateProject()
	const { data, refetch } = useProject(id)

	const form = useForm<TypeUpdateProjectSchema>({
		resolver: zodResolver(updateProjectSchema),
		defaultValues: {
			title: '',
			description: '',
			status: Status.TODO,
			ownerId: ''
		},
		mode: 'onChange'
	})

	useEffect(() => {
		if (open && id) {
			setShouldFetch(true)
			refetch()
		} else {
			setShouldFetch(false)
		}
	}, [open, id, refetch])

	useEffect(() => {
		if (data) {
			form.reset(data)
		}
	}, [data, form])

	const onSubmit = async (data: TypeUpdateProjectSchema) => {
		try {
			await updateProject({ id, data })
			form.reset(data)
		} catch (error) {
			const { toast } = await import('sonner')
			toast.error(`Ошибка при обновлении задачи: ${error}`)
		}
	}

	function handleOnChange(value: string) {
		setSearchTerm(value)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='w-1/4'>
				<DialogHeader>
					<DialogTitle>Настройка проекта</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input placeholder='Название' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Описание</FormLabel>
									<FormControl>
										<Input placeholder='Описание' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Статус</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='w-full'>
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
							name='ownerId'
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
																		'ownerId',
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
						<Button type='submit' className='cursor-pointer'>
							Сохранить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
