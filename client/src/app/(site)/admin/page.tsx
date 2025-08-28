import type { Metadata } from 'next'

import Home from '@/components/features/home/Home'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Главная',
	...NO_INDEX_PAGE
}

export default function AdminPage() {
	return <Home />
}
