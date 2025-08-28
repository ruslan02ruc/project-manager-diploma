import { Metadata } from 'next'

import Auth from '@/components/features/auth/Auth'

export const metadata: Metadata = {
	title: 'Авторизация'
}

export default function AuthPage() {
	return <Auth />
}
