import { zodResolver } from '@hookform/resolvers/zod'
import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/common/Button'
import { Calendar } from '@/components/ui/common/Calendar'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

import { useCreateTask } from '@/hooks/task/useCreateTask'

import { Priorities, Priority, Status, StatusOptions } from '@/libs/enums'
import { cn } from '@/libs/utils'
import {
	TypeCreateTaskSchema,
	createTaskSchema
} from '@/schemas/task/create-task.schema'

interface ITaskFormAdd {
	id: string
}

export default function TaskFormAdd({ id }: ITaskFormAdd) {
	const form = useForm<TypeCreateTaskSchema>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			title: '',
			description: '',
			status: Status.TODO,
			priority: Priority.LOW,
			startTime: undefined,
			endTime: undefined
		},
		mode: 'onChange'
	})

	const { createTask } = useCreateTask()

	const onSubmit = async (data: TypeCreateTaskSchema) => {
		try {
			// console.log({
			// 	...data,
			// 	startTime: data.startTime?.toISOString(),
			// 	endTime: data.endTime?.toISOString()
			// })
			await createTask({ id, data })
			form.reset()
		} catch (error) {
			const { toast } = await import('sonner')
			toast.error(`Ошибка при обновлении задачи: ${error}`)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
					name='priority'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Приоритет</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className='w-full'>
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
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Выберите дату</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										initialFocus
										mode='single'
										defaultMonth={
											field.value ? new Date(field.value) : undefined
										}
										selected={
											field.value ? new Date(field.value) : undefined
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
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Выберите дату</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										initialFocus
										mode='single'
										defaultMonth={
											field.value ? new Date(field.value) : undefined
										}
										selected={
											field.value ? new Date(field.value) : undefined
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
				<Button type='submit' className='cursor-pointer'>
					Сохранить
				</Button>
			</form>
		</Form>
	)
}
