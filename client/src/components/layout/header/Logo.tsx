'use client'

import { ClipboardList } from 'lucide-react'

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/common/Sidebar'

export function Logo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size='lg'
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
				>
					<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
						<ClipboardList className='size-4' />
					</div>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>Nova Task</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
