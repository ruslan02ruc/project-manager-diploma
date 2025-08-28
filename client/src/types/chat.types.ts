export interface IMember {
	id: string
	createdAt: string
	chatId: string
	userId: string
}

export interface IMessage {
	id: string
	createdAt: string
	content: string
	chatId: string
	senderId: string
}

export interface IChat {
	id: string
	createdAt: string
	isGroup: boolean
	title?: string
	projectId?: string
	members: IMember
	messages: IMessage[]
}

// export interface IChatEditInput extends Pick<IChat, 'message'> {}
