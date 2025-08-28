'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'

import { useProfile } from '@/hooks/useProfile'
import { useUpload } from '@/hooks/useUpload'
import { useUpdateUser } from '@/hooks/user/useUpdateUser'

import {
	TypeUpdateUserSchema,
	updateUserSchema
} from '@/schemas/user/update-user.scema'

export default function Profile() {
	const { user } = useProfile()
	const { updateUser } = useUpdateUser()

	const form = useForm<TypeUpdateUserSchema>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			name: '',
			email: '',
			// password: '',
			avatar: '',
			telegramName: ''
		},
		mode: 'onChange'
	})

	useEffect(() => {
		if (user) {
			form.reset(user)
		}
	}, [user, form])

	const onSubmit = async (data: TypeUpdateUserSchema) => {
		try {
			await updateUser(data)
			form.reset()
		} catch (error) {
			const { toast } = await import('sonner')
			toast.error(`Ошибка при создании проекта: ${error}`)
		}
	}

	const { uploadImage, isLoading, preview } = useUpload(url => {
		form.setValue('avatar', url)
	})

	return (
		<div className='flex h-full w-full justify-center'>
			<div className='w-md'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input placeholder='Имя' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input placeholder='Почта' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='telegramName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telegram name</FormLabel>
									<FormControl>
										<Input placeholder='Telegram name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='avatar'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Аватар</FormLabel>
									<FormControl>
										<Input
											type='file'
											accept='image/png, image/jpeg, image/jpg, image/webp'
											placeholder='Выберите изображение'
											onChange={e => {
												field.onChange(e)
												uploadImage(e)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{(preview || user) && (
							<img
								src={preview || user?.avatar}
								alt='preview'
								className='m-auto my-4 h-40 w-40 rounded object-cover'
							/>
						)}
						<Button className='flex w-full justify-evenly'>
							Сохранить
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
