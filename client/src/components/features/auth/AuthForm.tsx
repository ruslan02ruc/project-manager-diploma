'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

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

import { useAuthMutation } from '../../../hooks/useAuthMutation'

import {
	TypeCreateAccountSchema,
	createAccountSchema
} from '@/schemas/auth/create-account.schema'
import { TypeLoginSchema, loginSchema } from '@/schemas/auth/login.schema'

interface IAuthFields {
	isLoginForm: boolean
}

type AuthFormValues = TypeLoginSchema | TypeCreateAccountSchema

export default function AuthForm({ isLoginForm }: IAuthFields) {
	const form = useForm<AuthFormValues>({
		resolver: zodResolver(isLoginForm ? loginSchema : createAccountSchema),
		defaultValues: isLoginForm
			? {
					email: '',
					password: ''
				}
			: {
					name: '',
					email: '',
					password: ''
				},
		mode: 'onChange'
	})

	const { mutate } = useAuthMutation(isLoginForm, form.reset)

	const onSubmit: SubmitHandler<AuthFormValues> = data => {
		mutate(data)
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				{!isLoginForm && (
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
				)}
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
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input
									placeholder='Пароль'
									type='password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full cursor-pointer'>
					{isLoginForm ? 'Войти' : 'Создать аккаунт'}
				</Button>
			</form>
		</Form>
	)
}
