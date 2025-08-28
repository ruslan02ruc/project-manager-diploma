import { Metadata } from 'next'

import ClientStrangerProjects from '@/components/features/projects/ClientStrangerProjects'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Чужие проекты',
	...NO_INDEX_PAGE
}

export default function StrangerProjectsPage() {
	return <ClientStrangerProjects />
}
