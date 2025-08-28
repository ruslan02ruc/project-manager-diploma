import { useChatById } from '@/hooks/chat/useChats'

import { ChatForm } from './chatForm'
import { ChatMessage } from './chatMessge'

interface IChatMessager {
	chatId: string
}

export default function ChatMessager({ chatId }: IChatMessager) {
	// const { data } = useUser(id)
	const { data } = useChatById(chatId)

	return (
		<div className='mx-5 flex w-full flex-col justify-between'>
			<div className='flex flex-col gap-4'>
				{data?.data.messages.map((message, index) => (
					<ChatMessage chatData={message} isLeft={true} key={index} />
				))}
			</div>
			<ChatForm chatId={chatId} />
		</div>
	)
}
