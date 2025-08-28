'use client'

import { FC, PropsWithChildren } from 'react'

import Sidebar from '@/components/layout/sidebar/Sidebar'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <Sidebar>{children}</Sidebar>
}

export default Layout
