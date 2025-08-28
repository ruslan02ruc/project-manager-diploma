'use client'

import { useParams } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

import { SidebarApp } from '@/components/layout/sidebar/SidebarApp'
import { Separator } from '@/components/ui/common/Separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/components/ui/common/Sidebar'

import { useProject } from '@/hooks/project/useProject'

const Sidebar: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const params = useParams()
	const projectId = params?.id as string

	const { data } = useProject(projectId)
	const projectTitle = data?.title || 'Проект'

	return (
		<SidebarProvider>
			<SidebarApp />
			<SidebarInset>
				<header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator
							orientation='vertical'
							className='mr-2 data-[orientation=vertical]:h-4'
						/>
						<h1 className='max-w-[200px] truncate font-medium'>
							{projectTitle}
						</h1>
					</div>
				</header>
				<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default Sidebar
