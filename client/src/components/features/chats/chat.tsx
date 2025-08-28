'use client'

import { Separator } from '@/components/ui/common/Separator'

import ChatMessager from './chatMessager'

interface IChat {
	chatId: string
}

export default function Chat({ chatId }: IChat) {
	return (
		<div className='flex h-full w-full'>
			<Separator orientation='vertical' />
			<ChatMessager chatId={chatId} />
		</div>
	)
}
