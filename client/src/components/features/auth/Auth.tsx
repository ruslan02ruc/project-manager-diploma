'use client'

import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import AuthForm from './AuthForm'

export default function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(true)

	return (
		<div className='grid min-h-svh lg:grid-cols-2'>
			<div className='flex flex-col gap-4 p-6 md:p-10'>
				<div className='flex justify-center gap-2 md:justify-start'>
					<Link href='#' className='flex items-center gap-2 font-medium'>
						<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
							<ClipboardList className='size-4' />
						</div>
						Nova Task
					</Link>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>
						<div className='grid gap-4'>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='mb-6 text-3xl font-bold'>
									{isLoginForm ? 'Войти в аккаунт' : 'Регистрация'}
								</h1>
							</div>
							<AuthForm isLoginForm={isLoginForm} />
						</div>
						<div className='mt-4 text-center text-sm'>
							{isLoginForm ? 'Еще нет аккаунта? ' : 'Уже есть аккаунт? '}
							<button
								type='button'
								onClick={() =>
									setIsLoginForm(isLoginForm ? false : true)
								}
								className='cursor-pointer font-bold'
							>
								{isLoginForm ? 'Создать аккаунт' : 'Войти в аккаунт'}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='hidden items-center justify-center bg-violet-800 lg:flex'>
				<img
					src='/images/logo.svg'
					width={250}
					height={250}
					alt='Авторизация'
					className='object-cover'
				/>
			</div>
		</div>
	)
}
