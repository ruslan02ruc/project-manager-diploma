'use client'

import { useQueryClient } from '@tanstack/react-query'
import {
	ArrowDownUp,
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	BadgeCheck,
	FolderPen
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

import { useProjects } from '@/hooks/project/useProjects'

import { ProjectQueryParams } from '@/types/project.types'

const sortFields = [
	{ value: 'title', label: 'Название', icon: <FolderPen /> },
	{ value: 'status', label: 'Статус', icon: <BadgeCheck /> }
]

const sortOrders = [
	{ value: 'asc', label: 'ASC', icon: <ArrowUpNarrowWide /> },
	{ value: 'desc', label: 'DESC', icon: <ArrowDownWideNarrow /> }
]

export default function QueryHeader() {
	const [sortParams, setSortParams] = useState<ProjectQueryParams>({
		sortBy: 'createdAt',
		sortOrder: 'desc',
		title: ''
	})

	const { data: newData } = useProjects(sortParams)

	const form = useForm<any>({
		// resolver: zodResolver(),
		defaultValues: {
			sortBy: '',
			sortOrder: '',
			title: ''
		},
		mode: 'onChange'
	})

	const { register, handleSubmit, watch } = useForm()

	const nameValue = watch('title')
	useEffect(() => {
		const timeout = setTimeout(() => {
			handleSubmit(onSubmit)()
		}, 500)

		return () => clearTimeout(timeout)
	}, [nameValue])

	const queryClient = useQueryClient()

	const onSubmit = (data: any) => {
		setSortParams({
			sortBy: data.sortBy,
			sortOrder: data.sortOrder,
			title: data.title || ''
		})
		queryClient.setQueriesData({ queryKey: ['projects'] }, newData)
		toast.success('Сортировка применена')
	}

	return (
		<div className='py-4'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-row justify-between space-y-4'
				>
					<Input
						placeholder='Фильтрация по названию...'
						className='max-w-52'
						{...register('title')}
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' className='cursor-pointer'>
								<ArrowDownUp /> Сортировка
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-64 p-4'>
							<FormField
								control={form.control}
								name='sortBy'
								render={({ field }) => (
									<FormItem>
										<h1 className='mb-1 text-sm font-medium'>
											Сортировать по
										</h1>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Поле сортировки' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{sortFields.map(
													({ value, label, icon }) => (
														<SelectItem key={value} value={value}>
															<span className='flex items-center gap-2'>
																{icon} {label}
															</span>
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='sortOrder'
								render={({ field }) => (
									<FormItem>
										<h1 className='mb-1 text-sm font-medium'>
											Порядок
										</h1>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='ASC / DESC' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{sortOrders.map(
													({ value, label, icon }) => (
														<SelectItem key={value} value={value}>
															<span className='flex items-center gap-2'>
																{icon} {label}
															</span>
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Применить
							</Button>
						</DropdownMenuContent>
					</DropdownMenu>
				</form>
			</Form>
		</div>
	)
}

/*

return (
		<div className='flex justify-between py-4'>
			<Input placeholder='Фильтрация по названию...' className='max-w-52' {...register('title')} />

			<div className='flex gap-2'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='cursor-pointer'>
							<Filter /> Фильтр
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						</DropdownMenuContent>
						</DropdownMenu>
		
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' className='cursor-pointer'>
									<ArrowDownUp /> Сортировка
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-64 p-4'>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='space-y-4'
									>
										<FormField
											control={form.control}
											name='sortBy'
											render={({ field }) => (
												<FormItem>
													<h1 className='mb-1 text-sm font-medium'>
														Сортировать по
													</h1>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Поле сортировки' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{sortFields.map(
																({ value, label, icon }) => (
																	<SelectItem
																		key={value}
																		value={value}
																	>
																		<span className='flex items-center gap-2'>
																			{icon} {label}
																		</span>
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='sortOrder'
											render={({ field }) => (
												<FormItem>
													<h1 className='mb-1 text-sm font-medium'>
														Порядок
													</h1>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='ASC / DESC' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{sortOrders.map(
																({ value, label, icon }) => (
																	<SelectItem
																		key={value}
																		value={value}
																	>
																		<span className='flex items-center gap-2'>
																			{icon} {label}
																		</span>
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type='submit' className='w-full'>
											Применить
										</Button>
									</form>
								</Form>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			)

*/
