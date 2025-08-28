import type { Metadata } from 'next'

import Chats from '@/components/features/chats/chats'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Чат',
	...NO_INDEX_PAGE
}

export default function ChatsPage() {
	return <Chats />
}
