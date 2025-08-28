'use client'

import { useRouter } from 'next/navigation'

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/common/Avatar'

import { useUser } from '@/hooks/user/useUser'

import { ADMIN_URL } from '@/libs/constants/url.constants'

interface IChatUserItem {
	userId: string
	chatId: string
}

export default function ChatUserItem({ userId, chatId }: IChatUserItem) {
	const { data } = useUser(userId)
	const { push } = useRouter()

	return (
		<div
			className='hover:bg-muted flex cursor-pointer items-center gap-4 rounded-sm p-2'
			onClick={() => push(ADMIN_URL.chatEdit(chatId))}
		>
			<Avatar className='h-8 w-8 rounded-lg'>
				<AvatarImage src={data?.data.avatar} alt='name' />
				<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
			</Avatar>
			<div className='flex flex-col leading-tight'>
				<span className='text-sm font-medium'>{data?.data.name}</span>
				<span className='text-xs'>{data?.data.email}</span>
			</div>
		</div>
	)
}
