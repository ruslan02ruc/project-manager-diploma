import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/common/Avatar'

import { useUser } from '@/hooks/user/useUser'

import { IMessage } from '@/types/chat.types'

import { cn } from '@/libs/utils'

interface IChatUserMessage {
	chatData: IMessage
	isLeft?: boolean
}

export function ChatMessage({ chatData, isLeft }: IChatUserMessage) {
	const { data } = useUser(chatData.senderId)
	return (
		<div>
			<div
				className={cn(
					'mb-4 flex items-center gap-4',
					isLeft && 'flex-row-reverse'
				)}
			>
				<Avatar className='h-8 w-8 rounded-lg'>
					<AvatarImage src={data?.data.avatar} alt='name' />
					<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
				</Avatar>
				<div className='flex flex-col leading-tight'>
					<span className='text-sm font-medium'>{data?.data.name}</span>
				</div>
			</div>
			<div className='bg-accent flex flex-col rounded-md border p-2'>
				<p>{chatData.content}</p>
			</div>
		</div>
	)
}
