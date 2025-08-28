'use client'

import {
	BookCheck,
	Briefcase,
	ChartNoAxesCombined,
	Folder,
	FolderArchive,
	LayoutDashboard,
	MessageSquare
} from 'lucide-react'
import * as React from 'react'

import { Logo } from '@/components/layout/header/Logo'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from '@/components/ui/common/Sidebar'

import { ADMIN_URL } from '@/libs/constants/url.constants'
import { MainNav } from './MainNav'
import { UserNav } from './UserNav'

const data = [
	{
		title: 'Главная',
		url: ADMIN_URL.root(),
		icon: LayoutDashboard
	},
	{
		title: 'Статистика',
		url: ADMIN_URL.statistics(),
		icon: ChartNoAxesCombined
	},
	{
		title: 'Мои проекты',
		url: ADMIN_URL.projects(),
		icon: Folder
	},
	{
		title: 'Чужие проекты',
		url: ADMIN_URL.strangerProjects(),
		icon: Briefcase
	},
	{
		title: 'Личные чаты',
		url: ADMIN_URL.chats(),
		icon: MessageSquare
	},
	{
		title: 'Архив',
		url: ADMIN_URL.archive(),
		icon: FolderArchive
	},
	// {
	// 	title: 'Мои Задачи',
	// 	url: ADMIN_URL.tasks(),
	// 	icon: BookCheck
	// }
	// {
	// 	title: 'Уведомления',
	// 	url: '#', //FIXME нету URL
	// 	icon: Bell
	// }
]

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<MainNav data={data} />
			</SidebarContent>
			<SidebarFooter>
				<UserNav />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
