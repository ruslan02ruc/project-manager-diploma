'use client'

import { FC, PropsWithChildren } from 'react'

import ChatUserList from '@/components/features/chats/chatList'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <ChatUserList>{children}</ChatUserList>
}

export default Layout
