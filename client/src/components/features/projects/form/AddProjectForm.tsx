'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/common/Button'
import { DialogClose, DialogFooter } from '@/components/ui/common/Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'

import { useCreateProject } from '@/hooks/project/useCreateProject'

import {
	TypeCreateProjectSchema,
	createProjectSchema
} from '@/schemas/project/create-project.schema'

export default function AddProjectForm() {
	const form = useForm<TypeCreateProjectSchema>({
		resolver: zodResolver(createProjectSchema),
		defaultValues: {
			title: '',
			description: ''
		},
		mode: 'onChange'
	})

	const { createProject } = useCreateProject()

	const onSubmit = async (data: TypeCreateProjectSchema) => {
		try {
			await createProject(data)
			form.reset()
		} catch (error) {
			const { toast } = await import('sonner')
			toast.error(`Ошибка при создании проекта: ${error}`)
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
				<DialogFooter className='sm:justify-start'>
					<div className='flex w-full justify-evenly'>
						<DialogClose asChild>
							<Button
								type='button'
								className='cursor-pointer'
								variant='secondary'
							>
								Закрыть
							</Button>
						</DialogClose>
						<Button type='submit' className='cursor-pointer'>
							<DialogClose asChild></DialogClose>
							Создать
						</Button>
					</div>
				</DialogFooter>
			</form>
		</Form>
	)
}
