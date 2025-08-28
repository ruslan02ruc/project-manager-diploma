import type { Metadata } from 'next'

import Chat from '@/components/features/chats/chat'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Чат',
	...NO_INDEX_PAGE
}

export default async function ChatPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	return <Chat chatId={id} />
}
